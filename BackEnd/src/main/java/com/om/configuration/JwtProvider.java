package com.om.configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.mail.search.SearchTerm;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class JwtProvider {

    static SecretKey key= Keys.hmacShaKeyFor(JwtConstant.JWT_SECRECT.getBytes());

    public   String generateToken(Authentication authentication){
        Collection<? extends GrantedAuthority> authorities=
                authentication.getAuthorities();

        String roles= PopulateAuthorities(authorities);

        return Jwts.builder()
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime()+24*60*60*1000))
                .claim("email",authentication.getName())
                .claim("authorities",roles)
                .signWith(key)
                .compact();

    }

    public String  getEmailFromToken(String jwt){
        jwt= jwt.substring(7);

        Claims claims= Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(jwt)
                .getPayload();

        String email= String.valueOf(claims.get("email"));
          return  email;

    }

    private String PopulateAuthorities(Collection<? extends GrantedAuthority> authorities) {

        Set<String> auths= new HashSet<>();
        for(GrantedAuthority authority: authorities){
            auths.add(authority.getAuthority());
        }
        return  String.join(",",auths);

    }

}


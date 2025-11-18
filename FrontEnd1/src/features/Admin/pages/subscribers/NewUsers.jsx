import Input from "@/features/ui/Input";

  export const NewUsers = ({ data, search ,setSearch}) => (
    <>
      {/* 🔍 Search for Potential Users */}
      <Input
        type="text"
        placeholder="Search potential users..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border border-muted/40 rounded-lg focus:outline-none focus:ring-2"
      />

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-primary  text-left text-wrap text-background">
              <th className="pl-2 py-2">SN</th>
              <th >Name</th>
              <th >Email</th>
              <th >Plan</th>
              <th >Bill</th>

              <th >Date Created</th>
              <th className="pr-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u, i) => (
              <tr key={u.id} className="border text-left flex-col justify-start  border-b-muted/40 bg-primary-foreground hover:bg-gray-50">
                <td className="pl-2 py-3">{i + 1}</td>
                <td >{u.name}</td>
                <td >{u.email}</td>
                <td >
                  <span className="px-2 py-1 text-sm rounded-full bg-blue-100 text-blue-700">
                    {u.source}
                  </span>
                </td>
                <td >{u.created}</td>
                <td >
                  <button className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-sm">
                    Convert to Subscriber
                  </button>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No potential users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
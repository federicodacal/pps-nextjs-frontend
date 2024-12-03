interface User {
    name: string;
    email: string;
    phone: string;
    website: string;
    company: { name: string };
  }
  
  const UserCard = ({ user }: { user: User }) => {
    return (
      <div className="bg-gray-800 text-white p-6 rounded-lg space-y-4">
        <h1 className="text-2xl font-bold">{user.name}</h1>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Website:</strong> {user.website}</p>
        <p><strong>Company:</strong> {user.company.name}</p>
      </div>
    );
  };
  
  export default UserCard;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { User } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

interface UserProfileProps {
  user: User;
  result?: any; // Add 'result' property to match the passed props
}

const UserProfile = ({ user,result }: UserProfileProps) => {
  console.log(user)
  // const initials = user.name
  //   .split(" ")
  //   .map((n) => n[0])
  //   .join("")
  //   .toUpperCase();

    const memberSince = formatDistanceToNow( Date.now())
  // const memberSince = formatDistanceToNow(new Date(user.id), {
  //   addSuffix: true,
  // });

  return (
    <>
    {user?

    <Card className="glass-card hover-lift">
      <CardHeader className="pb-2">
        <h3 className="text-lg font-medium">Profile</h3>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-4">
            {user.picture ? (
              <AvatarImage src={user.picture} alt={user.name} />
            ) : (
              <AvatarFallback className="bg-gradient-to-br from-crypto-blue to-crypto-purple text-white text-2xl">
                {user.name}
              </AvatarFallback>
            )}
          </Avatar>
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-sm text-gray-500 mt-1">{user.email}</p>
          <div className="mt-3 px-4 py-2 bg-secondary rounded-full text-xs">
            Member {memberSince}
          </div>
        </div>
      </CardContent>
    </Card>:
    <div>Loading...</div>}</>
  );
};

export default UserProfile;

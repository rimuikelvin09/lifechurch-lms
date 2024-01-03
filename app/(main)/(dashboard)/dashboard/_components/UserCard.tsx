import { auth, clerkClient } from "@clerk/nextjs";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { redirect } from "next/navigation";

const UserCard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const user = await clerkClient.users.getUser(userId);

  const xp = user.publicMetadata.xp || 0;
  function getHundreds(number: any) {
    return Math.floor(number / 100) * 100;
  }
  function calculateProgress(currentValue: any, totalValue: any) {
    return Math.round((currentValue / totalValue) * 100);
  }

  return (
    <div className="bg-secondary border rounded-3xl gap-6 xl:gap-0 flex flex-col xl:flex-row p-6">
      <div className="flex gap-6 items-center flex-1">
        {user.hasImage ? (
          <div className="relative h-16 sm:h-24 lg:h-28 w-16 sm:w-24 lg:w-28 aspect-square">
            <Image
              height={300}
              width={300}
              src={user.imageUrl}
              alt="logo"
              className="p-2 rounded-full w-full h-full"
            />
            {/* <img src="https://ia902702.us.archive.org/24/items/discord-profile-deco-archive/Cherry%20Blossom%20Dark%20Pink.png" alt="border"  className="absolute top-0 left-0" /> */}
            {/* <img src="https://archive.org/download/discord-profile-deco-archive/Forest.png" alt="border"  className="absolute top-0 left-0" /> */}
            {/* <img src="https://archive.org/download/discord-profile-deco-archive/Frog%20Angry.png" alt="border"  className="absolute top-0 left-0" /> */}
            {/* <img src="https://archive.org/download/discord-profile-deco-archive/Mushroom%20Green.png" alt="border"  className="absolute top-0 left-0" /> */}
            <img src="https://archive.org/download/discord-profile-deco-archive/Smoke%20Clouds%20%28Blue%20Border%29.png" alt="border"  className="absolute top-0 left-0" />
          </div>
        ) : (
          <Image
            height={300}
            width={300}
            src={`https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=random`}
            alt="logo"
            className="h-10 sm:h-24 lg:h-28 w-10 sm:w-24 lg:w-28 rounded-full"
          />
        )}
        <div className="flex flex-col gap-4 w-full pr-6">
          <h1 className="font-bold sm:text-xl lg:text-3xl">
            {user.firstName?.charAt(0)?.toUpperCase()}
            {user.firstName?.slice(1)} {user.lastName?.charAt(0)?.toUpperCase()}
            {user.lastName?.slice(1)}
          </h1>
          <div className="flex flex-col gap-1">
            <div className="h-2 rounded-full w-full bg-primary/25">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${calculateProgress(50, getHundreds(xp) + 100)}%`,
                }}
              ></div>
            </div>
            <div className="flex justify-between items-center">
              <button>{`${xp} `}XP</button>
              <span className="text-muted-foreground">
                {getHundreds(xp) + 100} XP
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-center flex-1">
        <Button
          className="w-full rounded-xl p-6 bg-transparent border-border flex justify-between hover:!scale-[1.01]"
          variant={"outline"}
        >
          <span>Earn 10 XP for watching one chapter</span>
          <ArrowRight className="hidden sm:block" />
        </Button>
        <Button
          className="w-full rounded-xl p-6 bg-transparent border-border flex justify-between hover:!scale-[1.01] animate-pulse cursor-not-allowed"
          disabled
          variant={"outline"}
        >
          <span>Earn 50 XP for solving a Quiz </span>
          <ArrowRight className="hidden sm:block" />
        </Button>
      </div>
    </div>
  );
};

export default UserCard;

"use client";

import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
import { Footer } from "@/components/ui/Footer";
import { Navbar } from "@/components/ui/Navbar";
import { SearchBar } from "@/components/ui/SearchBar";
import { useSession } from "@/lib/auth-client";
import { api } from "@/trpc/react";
import { ChevronDown, SquarePlus, SquarePen, Trash2, ChevronUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react";
import { PostCard } from "./_components/PostCard";

type Data = {
  id: number;
  accountName: string;
  profileImage: string;
  image: string;
  title: string;
  tags: string[];
  description: string;
  themeColor: string;
  formLink: string;
  closeDate: string;
};

// ESLint Error
// const tagColor: {
//   [key: string]: string
// } = {
//   "Tech": "#4369c1",
//   "UX/UI": "#c16ddd",
//   "Marketing": "#e7935f",
// };
// const tagColor: Record<string, string> = {
//   "Tech": "#4369c1",
//   "UX/UI": "#c16ddd",
//   "Marketing": "#e7935f",
// };

const PostsBoardPage = () => {

  const router = useRouter();
  const [up, setUp] = useState(false);

  const { data: session } = useSession();
  const { data: posts, isLoading, error } = api.post.getByFilter.useQuery({ userId: session?.user.id || "" }, {
    enabled: !!session?.user.id
  });

  // handle searching
  const [search, setSearch] = useState<string>("");
  const [choice, setChoice] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any[]>();
  useEffect(() => {
    if (!isLoading) {
      const filtered = (posts ?? []).filter((post) => {
        return post.title.toLowerCase().includes(search.trim().toLowerCase()) || post.description.toLowerCase().includes(search.trim().toLowerCase()) || post.name.toLowerCase().includes(search.trim().toLowerCase());
      });
      setFilteredData(filtered);
    }
  }, [isLoading, search]);

  useEffect(() => {
    if (filteredData) {
      setFilteredData(current => (current ?? []).sort((a, b) => {
        if (choice === "ใหม่ไปเก่า") {
          return b.createdAt.getTime() - a.createdAt.getTime();
        } else if (choice === "เก่าไปใหม่") {
          return a.createdAt.getTime() - b.createdAt.getTime();
        } else if (choice === "ไล่ตามเดดไลน์") {
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        }
        return 0;
      }));
    }
  }, [choice, filteredData]);

  return (
    <div>
      <Navbar />
      {
        <section className="body-section gap-[1px] sm:gap-3">
          <div className="text-primary font-[600] text-[24px] sm:text-[28px]">
            โพสต์ของฉัน
          </div>
          <div className="flex flex-col items-end sm:flex-row items-center gap-y-2 sm:gap-x-4">
            <div className="sm:hidden flex gap-x-2">
              <Dropdown
                itemClassName="focus:bg-[#de5c8e4d] cursor-pointer text-xs sm:text-sm lg:text-base"
                className="w-fit min-w-[116px] h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary"
                content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"]}
                icon={up ? <ChevronUp /> : <ChevronDown />}
                onOpenChange={(open) => {
                  setUp(current => !current);
                }}
                onValueChange={(value) => {
                  setChoice(value);
                }}
              >
                เรียงลำดับ
              </Dropdown>
              <Button className="h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] bg-white text-text-gray border-1 text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" onClick={() => router.push("/create")}>
                สร้างโพสต์ใหม่
                <SquarePlus />
              </Button>
            </div>
            <div className="flex gap-x-4 w-full">
              <SearchBar value={search} onChange={(e) => {
                setSearch(e.target.value);
              }} searchIconClassName="sm:left-4 sm:top-2 lg:top-3 sm:h-6 sm:w-6 h-5 w-5 top-2 left-4" inputClassName="placeholder:text-text-gray h-[34px] sm:h-[40px] lg:h-[48px] lg:text-base sm:text-sm text-xs placeholder:lg:text-base placeholder:sm:text-sm placeholder:text-xs" />
              <Dropdown
                itemClassName="cursor-pointer text-xs sm:text-sm lg:text-base"
                className="min-w-[138px] w-fit hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] text-text-gray text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary"
                content={["ใหม่ไปเก่า", "เก่าไปใหม่", "ไล่ตามเดดไลน์"]} icon={up ? <ChevronUp /> : <ChevronDown />}
                onOpenChange={(open) => {
                  setUp(current => !current);
                }}
                onValueChange={(value) => {
                  console.log(value);
                  setChoice(value);
                }}
              >
                เรียงลำดับ
              </Dropdown>
              <Button className="hidden sm:flex h-[34px] sm:h-[40px] lg:h-[48px] rounded-[6px] bg-white text-text-gray hover:border-primary hover:text-primary border-1 text-xs sm:text-sm lg:text-base border-stroke hover:border-primary hover:bg-white hover:text-primary" onClick={() => router.push("/create")}>
                สร้างโพสต์ใหม่
                <SquarePlus />
              </Button>
            </div>
          </div>
          {isLoading ? (<div className="w-full h-full flex justify-center items-center text-text-gray p-5">กำลังโหลด...</div>) : (
            filteredData === null || filteredData === undefined || filteredData?.length === 0 ? <div className="w-full h-full flex justify-center items-center text-text-gray p-5">ไม่พบโพสต์</div> : (
              <div className="grid ssm:grid-cols-1 ssm:grid-cols-2 ssm:gap-[6px] sm:flex sm:flex-col sm:gap-y-[24px] py-2">
                {(filteredData ?? []).map((event: any) => (
                  <PostCard key={event.id} event={event} />
                ))}
              </div>
            ))}
        </section>
      }
      <Footer />
    </div>
  )
}

export default PostsBoardPage;

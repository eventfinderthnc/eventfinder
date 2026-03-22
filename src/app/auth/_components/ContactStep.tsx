import { Button } from "@/components/ui/Button";
import { FormInput } from "@/components/ui/FormInput";
import { ArrowLeft } from "lucide-react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useEffect, useState } from "react";
import { api } from "@/trpc/react";

export default function ContactStep({
  onBack,
  onNext,
}: {
  onBack: () => void;
  onNext: () => void;
}) {
  const { data: mine, isLoading } = api.organization.getMine.useQuery();
  const utils = api.useUtils();
  const updateMineSocials = api.organization.updateMineSocials.useMutation({
    onSuccess: async () => {
      await utils.organization.getMine.invalidate();
    },
  });

  const [instagram, setInstagram] = useState("");
  const [discord, setDiscord] = useState("");
  const [signUpForm, setSignUpForm] = useState("");

  useEffect(() => {
    const s = mine?.socials;
    if (!s) return;
    setInstagram(s.instagram ?? "");
    setDiscord(s.discord ?? "");
    setSignUpForm(s.signUpForm ?? "");
  }, [mine?.socials]);

  const canContinue =
    Boolean(instagram.trim()) &&
    Boolean(discord.trim()) &&
    !isLoading &&
    mine !== null;

  const handleNext = async () => {
    await updateMineSocials.mutateAsync({
      instagram: instagram.trim(),
      discord: discord.trim(),
      ...(signUpForm.trim() ? { signUpForm: signUpForm.trim() } : {}),
    });
    onNext();
  };

  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <ArrowLeft
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
          onClick={onBack}
        />
        <h1 className="text-xl sm:text-2xl">ข้อมูลติดต่อ</h1>
        <ArrowLeft className="text-white" />
      </div>

      <div className="my-5 flex flex-col items-center justify-center gap-y-10 sm:justify-between">
        <div className="hidden h-[148.5px] w-[253px] sm:block">
          <img
            src="/images/svg/undraw_hello_ccwj_2.svg"
            className="h-full w-full"
            alt=""
          />
        </div>
        <div className="flex w-full flex-col gap-y-3">
          <div className="relative">
            <div className="flex">
              <Icon
                icon="mdi:instagram"
                className="absolute bottom-2 left-2 text-[1.6rem] text-[#b3b3b3]"
              />
              <span className="absolute bottom-2 left-9 text-[#b3b3b3]">:</span>
            </div>
            <FormInput
              label="Instagram"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="h-10 border-stroke pl-12 text-text-gray"
            />
          </div>
          <div className="relative">
            <div className="flex">
              <Icon
                icon="mdi:discord"
                className="absolute bottom-2 left-2 text-[1.6rem] text-[#b3b3b3]"
              />
              <span className="absolute bottom-2 left-9 text-[#b3b3b3]">:</span>
            </div>
            <FormInput
              label="Discord"
              value={discord}
              onChange={(e) => setDiscord(e.target.value)}
              className="h-10 border-stroke pl-12 text-text-gray"
            />
          </div>
          <div className="relative">
            <div className="flex">
              <Icon
                icon="mdi:file-document-edit-outline"
                className="absolute bottom-2 left-2 text-[1.6rem] text-[#b3b3b3]"
              />
              <span className="absolute bottom-2 left-9 text-[#b3b3b3]">:</span>
            </div>
            <FormInput
              label="ลิงก์ฟอร์มสมัคร (ไม่บังคับ)"
              value={signUpForm}
              onChange={(e) => setSignUpForm(e.target.value)}
              className="h-10 border-stroke pl-12 text-text-gray"
            />
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4">
        <Button
          className="w-full hover:cursor-pointer"
          onClick={() => void handleNext()}
          disabled={!canContinue || updateMineSocials.isPending}
        >
          {updateMineSocials.isPending ? "กำลังบันทึก..." : "ถัดไป"}
        </Button>

        <div className="flex w-full items-center justify-center gap-1.5">
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4d4d4]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#949494]" />
          <div className="h-1.5 w-1.5 rounded-full bg-[#d4d4d4]" />
        </div>
      </div>
    </div>
  );
}

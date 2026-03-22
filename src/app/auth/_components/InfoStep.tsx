"use client";

import { Button } from "@/components/ui/Button";
import { ArrowLeft, ChevronDown, ChevronUp, Check } from "lucide-react";
import { Icon } from "@iconify/react";
import { FormInput } from "@/components/ui/FormInput";
import { Dropdown } from "@/components/ui/Dropdown";
import { Input } from "@/components/ui/Input";
import { useEffect, useRef, useState } from "react";
import { api } from "@/trpc/react";
import useImageUpload from "@/lib/hooks/useImageUpload";

interface InfoStepProps {
  onBack: () => void;
  onNext: () => void;
  type?: "attendee" | "organizer";
}

const INPUT_ID = "profile-picture-input";
const PREVIEW_DIV_ID = "profile-picture-div";

const PREVIEW_IMG_STYLE =
  "height:100%; width:100%; border-radius: 9999px; object-fit:cover; border: 1px solid #d6d6d6";

export default function InfoStep({
  onBack,
  onNext,
  type = "organizer",
}: InfoStepProps) {
  const isOrganizer = type === "organizer";
  const { data: faculties } = api.faculty.getAll.useQuery();
  const { data: me } = api.user.me.useQuery(undefined, { enabled: !isOrganizer });
  const { data: mine, isLoading: mineLoading } = api.organization.getMine.useQuery(undefined, {
    enabled: isOrganizer,
  });
  const utils = api.useUtils();

  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const { isUploading } = useImageUpload(INPUT_ID, PREVIEW_DIV_ID, {
    upload: true,
    onUploaded: (url) => setImageUrl(url),
  });

  const [up, setUp] = useState(false);
  const [name, setName] = useState("");
  const [facultyId, setFacultyId] = useState<string | undefined>(undefined);
  const [isReceiveMail, setIsReceiveMail] = useState(false);
  const [bio, setBio] = useState("");

  const ensureMine = api.organization.ensureMine.useMutation({
    onSuccess: () => utils.organization.getMine.invalidate(),
  });
  const ensuredAttempt = useRef(false);

  const title = type === "attendee" ? "กรอกข้อมูลส่วนตัว" : "กรอกข้อมูลชมรม";
  const nameLabel = type === "attendee" ? "ชื่อ" : "ชื่อชมรม";
  const descLabel = type === "attendee" ? "คำอธิบายตัวตน" : "คำอธิบาย";
  const selectedFacultyName = faculties?.find((f) => f.id === facultyId)?.name ?? "เลือก";

  const updateInfo = api.user.updateOnboardingInfo.useMutation({
    onSuccess: async () => {
      await utils.user.me.invalidate();
    },
  });

  const updateMineInfo = api.organization.updateMineInfo.useMutation({
    onSuccess: async () => {
      await utils.organization.getMine.invalidate();
    },
  });

  useEffect(() => {
    if (!isOrganizer || mineLoading || mine !== null || ensuredAttempt.current) return;
    ensuredAttempt.current = true;
    ensureMine.mutate(undefined, {
      onError: () => {
        ensuredAttempt.current = false;
      },
    });
  }, [isOrganizer, mineLoading, mine, ensureMine]);

  useEffect(() => {
    if (isOrganizer && mine) {
      setName(mine.name ?? "");
      setFacultyId(mine.facultyId ?? undefined);
      setBio(mine.bio ?? "");
      setImageUrl(mine.image ?? undefined);
      return;
    }
    if (!isOrganizer && me) {
      setName(me.name ?? "");
      setFacultyId(me.facultyId ?? undefined);
      setIsReceiveMail(me.isReceiveMail ?? false);
    }
  }, [isOrganizer, mine, me]);

  useEffect(() => {
    if (!isOrganizer || !imageUrl) return;
    const div = document.getElementById(PREVIEW_DIV_ID);
    if (!div) return;
    div.style.border = "none";
    div.innerHTML = `<img id="profile-picture-image" style="${PREVIEW_IMG_STYLE}" src="${imageUrl}" alt="Profile"/>`;
  }, [isOrganizer, imageUrl]);

  const canContinueAttendee = !isUploading && Boolean(facultyId);
  const canContinueOrganizer =
    Boolean(name.trim()) &&
    Boolean(facultyId) &&
    Boolean(bio.trim()) &&
    Boolean(imageUrl) &&
    !isUploading &&
    !mineLoading &&
    !ensureMine.isPending;

  const canContinue = isOrganizer ? canContinueOrganizer : canContinueAttendee;

  const handleNext = async () => {
    if (isOrganizer) {
      await updateMineInfo.mutateAsync({
        name: name.trim(),
        facultyId: facultyId!,
        bio: bio.trim(),
        image: imageUrl,
      });
    } else {
      if (!facultyId) return;
      await updateInfo.mutateAsync({
        name,
        facultyId,
        isReceiveMail,
        image: imageUrl,
      });
    }
    onNext();
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between">
        <ArrowLeft
          onClick={onBack}
          className="cursor-pointer text-text-gray hover:text-text-gray-hover"
        />
        <h1 className="text-xl sm:text-2xl">{title}</h1>
        <ArrowLeft className="text-white" />
      </div>

      <div className="my-5 flex flex-1 flex-col items-center">
        <label
          htmlFor={INPUT_ID}
          className="relative flex h-[80px] w-[80px] cursor-pointer items-center justify-center rounded-full sm:h-[130px] sm:w-[130px]"
        >
          <Input
            id={INPUT_ID}
            className="hidden"
            accept="image/jpeg, image/png"
            type="file"
          />
          <div
            id={PREVIEW_DIV_ID}
            className="flex h-[80px] w-[80px] items-center justify-center overflow-hidden rounded-full border border-[#ffb7d3] bg-[#fff2f6] sm:h-[130px] sm:w-[130px]"
          >
            <Icon
              icon="bxs:user"
              className="text-[2.5rem] text-[#de5c8e] opacity-50 sm:text-[4rem]"
            />
          </div>
          <Icon
            icon="fa7-solid:pen"
            className="absolute bottom-0 right-[-2] rounded-full bg-white p-[8px] text-[2rem] text-primary shadow-[0.5px_0.5px_4px_0px_rgba(0,0,0,0.25)] sm:p-[12px] sm:text-[2.7rem]"
          />
        </label>
        <div className="flex w-full flex-col items-center gap-y-2">
          <div className="relative w-full">
            <FormInput
              label={nameLabel}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-8 border-stroke text-[12px] text-text-gray sm:h-10 sm:text-[14px]"
            />
          </div>
          <div className="flex w-full flex-col gap-y-2.5">
            <label
              htmlFor="faculty-dropdown"
              className="text-base font-bold text-black"
            >
              คณะ
            </label>
            <Dropdown
              id="faculty-dropdown"
              content={faculties?.map((f) => f.name) ?? []}
              itemClassName="cursor-pointer"
              menuContentClassName="w-[240px] sm:w-[470px]"
              className="flex h-8 w-full items-center justify-between rounded-md border-stroke text-[12px] text-text-gray hover:border-primary hover:bg-white hover:text-primary sm:h-10 sm:text-[14px]"
              icon={up ? <ChevronUp /> : <ChevronDown />}
              onOpenChange={() => setUp((current) => !current)}
              value={selectedFacultyName === "เลือก" ? undefined : selectedFacultyName}
              onValueChange={(name) => {
                const f = faculties?.find((x) => x.name === name);
                setFacultyId(f?.id);
              }}
            >
              <span>{selectedFacultyName}</span>
            </Dropdown>
          </div>
          <div className="relative w-full">
            {type === "attendee" ? (
              <div className="mt-4 flex w-full items-center space-x-2">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="email-notification"
                    checked={isReceiveMail}
                    onChange={(e) => setIsReceiveMail(e.target.checked)}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-stroke bg-white checked:border-primary checked:bg-primary transition-all focus:outline-none focus:ring-primary"
                  />
                  <Check className="pointer-events-none absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100" />
                </div>
                <label
                  htmlFor="email-notification"
                  className="cursor-pointer text-sm font-medium leading-none text-text-gray peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  รับการแจ้งเตือนกิจกรรมใหม่ผ่านทางอีเมล?
                </label>
              </div>
            ) : (
              <FormInput
                label={descLabel}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="w-full py-1 text-[12px] text-text-gray sm:h-30 sm:py-2 sm:text-[14px]"
                isTextArea
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <Button
          className="w-full hover:cursor-pointer"
          onClick={() => void handleNext()}
          disabled={!canContinue || updateInfo.isPending || updateMineInfo.isPending}
        >
          {isUploading
            ? "กำลังอัปโหลด..."
            : updateInfo.isPending || updateMineInfo.isPending
              ? "กำลังบันทึก..."
              : "ถัดไป"}
        </Button>

        <div className="flex w-full items-center justify-center gap-1.5">
          {type === "attendee" ? (
            <>
              <div className="h-1.5 w-1.5 rounded-full bg-[#949494]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#d4d4d4]" />
            </>
          ) : (
            <>
              <div className="h-1.5 w-1.5 rounded-full bg-[#949494]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#d4d4d4]" />
              <div className="h-1.5 w-1.5 rounded-full bg-[#d4d4d4]" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import { useEffect } from "react"

const useImageUpload = (inputID: string, divID: string) => 
  useEffect(() => {
    const input: HTMLInputElement = document.getElementById(inputID) as HTMLInputElement;
    const div: HTMLInputElement = document.getElementById(divID) as HTMLInputElement;
    input.addEventListener("change", (e: Event) => {
      if(input?.files?.[0]) {
        const url = URL.createObjectURL(input?.files?.[0] as Blob);
        div.style.border = "none"
        div.innerHTML = `<img id="profile-picture-image" style="height:100%; width:100%; border-radius: 9999px; object-fit:cover; border: 1px solid #d6d6d6" src="${url}" alt="Profile Image"/>`;
      }
    });
  }, []);

export default useImageUpload;
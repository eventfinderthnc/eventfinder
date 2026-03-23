interface ActivityMailProps {
	postTitle: string;
	postImage: string;
	claimLink: string;
	postDescription?: string | null;
	organizationName?: string;
}

export function ActivityCardMail({
	postTitle,
	postImage,
	claimLink,
	postDescription,
	organizationName,
}: ActivityMailProps): string {
	return `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; gap: 16px; padding-left: 24px; padding-right: 24px;">
            <h1 style="color: #DE5C8E; margin-top: 16px; font-weight: 700; font-size: 20px;">
                <strong>${postTitle}</strong>
            </h1>
            <img
                src="${postImage}"
                alt="${postTitle}"
                style="width: 100%; height: auto; border-radius: 8px; margin-bottom: 8px;"
            />
            <h2>${postDescription}</h2>
            <div style="text-align: center; margin-top: 32px; margin-bottom: 24px;">
                <a
                    href="${claimLink}"
                    style="
                        display: inline-block;
                        text-decoration: none;
                        background-color: #DE5C8E;
                        color: white;
                        padding: 12px 24px;
                        border-radius: 24px;
                        font-size: 18px;
                        width: 100%;
                        max-width: 384px;
                        box-sizing: border-box;
                        text-align: center;
                    "
                >
                    📅 เพิ่มลงในปฏิทิน
                </a>
            </div>
        </div>
    `;
}

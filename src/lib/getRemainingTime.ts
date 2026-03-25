export function getRemainingTime(closeDate: Date) {
	const diff = closeDate.getTime() - Date.now();
	if (diff <= 0) return "ปิดรับสมัครแล้ว";

	const hours = Math.floor(diff / (1000 * 60 * 60));
	const minutes = Math.floor((diff / (1000 * 60)) % 60);
	const days = Math.floor(hours / 24);
	return days >= 1 ? `${days} วัน ${hours % 24} ชั่วโมง` : `${hours} ชั่วโมง ${minutes} นาที`;
}

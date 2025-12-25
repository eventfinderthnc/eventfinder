type NavItems = {
    label: string;
    href: string;
}

export const navItemsOrg: NavItems[] = [
    { label: "แดชบอร์ด", href: "/dashboard" },
    { label: "โพสต์ของฉัน", href: "/posts" },
    { label: "สร้างโพสต์", href: "/create" },
    { label: "เกี่ยวกับเรา", href: "/about" },
];

export const navItemsAtten: NavItems[] = [
    { label: "หน้าหลัก", href: "/"},
    { label: "กิจกรรม", href: "/activities" },
    { label: "ชมรม", href: "/clubs" },
    { label: "ปฏิทิน", href: "/calendar" },
    { label: "เกี่ยวกับเรา", href: "/about" },
];
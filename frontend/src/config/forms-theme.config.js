export const selectTheme = {
    field: {
        select: {
            base: "border-none focus:ring-0 bg-basewhite",
            colors: {
                gray: "text-baseblack bg-neutrals-100 focus:outline-none",
            },
            withAddon: {
                off: "rounded-l-lg",
            },
            sizes: {
                md: "py-2.5 px-5",
            },
        },
    },
};

export const searchInputTheme = {
    base: "flex flex-1",
    field: {
        input: {
            base: "block border-x-0 min-h-full",
            colors: {
                gray: "border-y-neutrals-200 text-baseblack",
            },
            withAddon: {
                off: "rounded-none",
            },
            sizes: {
                md: "py-2.5 text-sm w-64 min-w-28",
            },
        },
    },
};

export const rangeSliderTheme = {
    root: {
        base: "flex",
    },
    field: {
        base: "relative w-full",
        input: {
            base: "-translate-y-1/2 absolute z-10 [&::-moz-range-progress]:h-0 w-full cursor-pointer appearance-none rounded-lg bg-transparent",
        },
    },
};

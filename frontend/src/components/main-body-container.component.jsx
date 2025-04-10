/**
 * Main Body Container Component
 *
 * A layout component for main content areas with responsive padding.
 * Provides optional title section with helper content.
 *
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Main content to render
 * @param {string} [props.title] - Optional title to display at the top
 * @param {React.ReactNode} [props.titleHelper] - Optional content to display next to title
 */
const MainBodyContainer = ({ children, title, titleHelper }) => (
    <main className="p-5 md:p-10 lg:py-10 lg:px-20 flex flex-col flex-1 items-start gap-2.5 md:gap-5 lg:gap-7 overflow-auto">
        {title && (
            <div className="flex justify-between items-center self-stretch">
                <h1 className="text-baseblack text-lg md:text-3xl font-bold">
                    {title}
                </h1>
                {titleHelper}
            </div>
        )}
        {children}
    </main>
);

export default MainBodyContainer;

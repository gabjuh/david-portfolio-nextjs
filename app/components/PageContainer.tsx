import IPageContainer from "@/interfaces/IPageContainer"

const PageContainer: React.FC<IPageContainer> = ({children}) => {
  return (
    <>
      <div className={`container mx-auto px-4 py-10 w-full`}>
        <div id="page-container-hidden" className="">
          {children}
        </div>
      </div>
    </>
  )
}

export default PageContainer
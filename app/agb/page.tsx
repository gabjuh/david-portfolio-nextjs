import IData from '@/interfaces/IData';
import { openSheetApiUrl } from '../../helpers/connect';
import PageContainer from '../components/PageContainer';
import Title from '../components/Title';

export default async function AgbPage() {

  async function getData() {
    const res = await fetch(`https://${process.env.NEXT_PUBLIC_BACKEND_API}/data.json`)
    if (!res.ok) {
      throw new Error('Failed to fetch data')
    }
    const data = res.json();
    return data;
  }

  const data: IData = await getData();

  return (
    <PageContainer>
      <Title className="text-center uppercase tracking-[.4rem] mb-3" title={data.agb[0].pageTitle} />
      <h2 className="text-lg text-center">{data.agb[0].underTitle}</h2>

      <div className="lg:max-w-[1000px] mx-auto">
        {data.agb.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="md:text-center text-xl font-semibold underline mt-12" id="geltungsbereich">
                {item.title}
              </h3>
              <p className="text-justify mt-5">
                {item.paragraph}
              </p>
            </div>
          );
        })}
      </div>
    </PageContainer>
  )
}
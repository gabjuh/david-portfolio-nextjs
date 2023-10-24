import ImageAndText from './ImageAndText';
import IData from '@/interfaces/IData';

const About = ({ data } : {data: IData}) => {

  return (
    <div className="mb-36">
      {/* <Title title={data.about[0].pageTitle} id="about-me" /> */}

      <ImageAndText
        title={data.about[0].pageTitle}
        driveId={data.about[0].driveId}
        fileName={data.about[0].fileName}
        alt={data.about[0].imgAlt}
        imageLeft={data.about[0].imgLeft === 'TRUE' ? true : false}
        classNameForImg="rounded-md"
        text={data.about[0].textDe}
        textAlign={data.about[0].textAlign}
        buttonText={data.about[0].buttonText}
      />

    </div>
  )
}

export default About;
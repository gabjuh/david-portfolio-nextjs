import Image from 'next/image';
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

import MediaSlider, { ISlide } from '@/app/components/MediaSlider';
import convertStringToUrlFriendly from '@/helpers/convertStringToUrlFriendly';
import IProjectItem from '@/interfaces/IProjectItem';

const ProjectItem: React.FC<IProjectItem> = ({
    title,
    mediaType,
    youtubeId,
    driveId,
    fileName,
    imgDimension,
    loaded,
    text
}) => {

    const friendlyFileName = convertStringToUrlFriendly(fileName ?? '');

    const dummySlides: ISlide[] = [
        {
            type: 'image',
            src: 'https://api-davidbudai.web4musicians.eu/img/Lyren_03-kicsi-3.jpg'
        },
        {
            type: 'image',
            src: 'https://api-davidbudai.web4musicians.eu/img/Violone-1.jpg'
        },
        {
            type: 'image',
            src: 'https://api-davidbudai.web4musicians.eu/img/IMG_20230601_093350_kicsi.jpg'
        },
        {
            type: 'video',
            src: 'ScMzIvxBSi4'
        },
        {
            type: 'image',
            src: 'https://api-davidbudai.web4musicians.eu/img/Rabab-01.jpg'
        },
        {
            type: 'image',
            src: 'https://api-davidbudai.web4musicians.eu/img/Rabab-01.jpg'
        },

    ];

    return (
        <>
            <div className="flex flex-row gap-3 ">
                <div className="w-full h-full mt-10">
                    {/* <MediaSlider
                        slides={dummySlides}
                    ></MediaSlider> */}

                    {/*<iframe width="450" height="280" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}

                    {/*<Image*/}
                    {/*    // src={fileName ? `https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${friendlyFileName}` : ''}*/}
                    {/*    // src="https://api-davidbudai.web4musicians.eu/img/Violone-1.jpg"*/}
                    {/*    src="https://api-davidbudai.web4musicians.eu/img/Rabab-01.jpg"*/}
                    {/*    alt={`${title} - Project Image`}*/}
                    {/*    // layout="fill"*/}
                    {/*    // objectFit="cover"*/}
                    {/*    quality="100"*/}
                    {/*    className="!h-[400px] w-auto mx-auto rounded-md drop-shadow-xl"*/}
                    {/*    width="200"*/}
                    {/*    height="200"*/}
                    {/*    priority*/}
                    {/*/>*/}
                </div>
                {/* <div className="w-2/3 leading-8 lg:mt-0 mt-5 text-center lg:text-justify">
                    <h3 className="text-2xl text-center lg:text-left font-semibold mb-3">{title}</h3>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad aliquam commodi culpa cum debitis
                        dolorum, enim facere illo itaque nisi nostrum omnis possimus quaerat quam quas quibusdam quis
                        rerum sequi similique sunt unde vero vitae voluptatum? Accusantium alias consequuntur deleniti
                        dolorem ducimus earum, ipsam numquam placeat, quo ullam voluptate voluptates.
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.A atque aut blanditiis consectetur
                        dolorem dolores earum illum ipsa laudantium pariatur quia quis quisquam repellendus sit suscipit
                        vel, voluptas. Consectetur, cumque delectus dolor enim eveniet id laborum, nemo neque nostrum
                        praesentium repellat tempore. Debitis earum ex ipsum labore magnam quisquam ullam veniam?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.A atque aut blanditiis consectetur
                        dolorem dolores earum illum ipsa laudantium pariatur quia quis quisquam repellendus sit suscipit
                        vel, voluptas. Consectetur, cumque delectus dolor enim eveniet id laborum, nemo neque nostrum
                        praesentium repellat tempore. Debitis earum ex ipsum labore magnam quisquam ullam veniam?
                    </p>
                    <p>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet consequatur consequuntur
                        cupiditate error est in ipsa itaque laborum magnam natus, odit placeat quas quis sunt, suscipit
                        vero, voluptatum. Ab beatae dolorem laudantium libero nobis quae repellat reprehenderit. Alias,
                        distinctio dolor fugit harum nihil quasi. Aliquam, deleniti eius eos ipsa iure iusto veritatis?
                        Accusantium aliquam aperiam dolor, fugiat id obcaecati porro voluptatum. Accusamus adipisci
                        aspernatur at atque autem beatae cum dolorem eius eligendi, error et eveniet ex expedita facere
                        fugiat illum ipsum iure labore laboriosam natus neque praesentium qui quidem saepe soluta
                        temporibus velit voluptas? Aliquam architecto, assumenda consectetur dolore dolorum earum enim
                        excepturi, incidunt ipsa labore maiores repudiandae? Dicta dolorum incidunt odio omnis
                        voluptatum. Aperiam cupiditate eveniet, hic ipsum itaque laborum maiores nam reiciendis sed,
                        tempora temporibus tenetur veniam voluptatum! Atque, delectus dignissimos dolores eligendi et
                        excepturi illo iste laborum mollitia nisi, obcaecati officiis pariatur quisquam, reiciendis rem
                        soluta velit.
                    </p>
                </div> */}
                <div className=""></div>
            </div>

            {/*<div className={`${!mediaType ? '' : 'flex flex-col lg:flex-row'} mt-2 mb-28`}>*/}
            {/*    <div className="w-full lg:w-1/2 flex justify-center mt-2.5">*/}
            {/*        {(mediaType === 'image' || mediaType === '') && driveId && fileName &&*/}
            {/*            <div className="lg:w-[300px] w-[450px] mr-0 lg:mr-7">*/}
            {/*                /!* <Image src={fileName ?? ''} alt="Project Image" /> *!/*/}
            {/*                <Image*/}
            {/*                    src={fileName ? `https://${process.env.NEXT_PUBLIC_BACKEND_API}/img/${friendlyFileName}` : ''}*/}
            {/*                    alt="Project Image"*/}
            {/*                    className="!w-[300px] mx-auto"*/}
            {/*                    width="200"*/}
            {/*                    height="120"*/}
            {/*                />*/}
            {/*            </div>*/}
            {/*        }*/}
            {/*        {mediaType === 'video' &&*/}
            {/*            <>*/}
            {/*                {youtubeId &&*/}
            {/*                    <div className="mr-0 lg:mr-7 w-full">*/}
            {/*                        <div className="w-[300px] mx-auto hidden lg:block">*/}
            {/*                            <iframe width="300" height="170" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}
            {/*                        </div>*/}
            {/*                        <div className="w-full lg:w-full lg:hidden">*/}
            {/*                            <div className="w-[450px] mx-auto">*/}
            {/*                                <iframe width="450" height="280" src={`https://www.youtube-nocookie.com/embed/${youtubeId}`} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen></iframe>*/}
            {/*                            </div>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                }*/}
            {/*            </>*/}
            {/*        }*/}
            {/*    </div>*/}
            {/*    <div className="leading-8 lg:mt-0 mt-5 text-center lg:text-justify">*/}
            {/*        <ReactMarkdown*/}
            {/*            remarkPlugins={[remarkGfm]}*/}
            {/*            children={loaded && text ? text : ''}*/}
            {/*        />*/}
            {/*    </div>*/}
            {/*</div>*/}
        </>
    );
};

export default ProjectItem;
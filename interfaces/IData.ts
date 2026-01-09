import IAgb from './IAgb';
import IBiography from './IBiography';
import IEvents from './IEvents';
import IHome from './IHome';
import IImages from './IImages';
import IImpressum from './IImpressum';
import IInstruments from './IInstruments';
import Menu from './IMenu';
import IProjects from './IProjects';
import ISettings from './ISettings';
import ISliders from './ISlider';
import IVideos from './IVideos';

export default interface IData {
  timeStamp: string;
  home: IHome[];
  biography: IBiography[];
  instruments: IInstruments[];
  projects: IProjects[];
  programs: IProjects[];
  TLbC: IProjects[];
  // projects new !
  images: IImages[];
  videos: IVideos[];
  sliders: ISliders[];
  events: IEvents[];
  agb: IAgb[];
  impressum: IImpressum[];
  settings: ISettings[];
  menu: Menu[];
  
  // hero?: IHero[];
  // about?: IAbout[];
  // cv?: ICV[];
  // videos?: IVideos[];
  // audio?: IAudio[];
  // ensembles?: IEnsembles[];
  // concerts?: IConcerts[];
}
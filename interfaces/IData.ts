import IAbout from "./IAbout";
import IAgb from "./IAgb";
import IAudio from "./IAudio";
import ICV from "./ICV";
import IConcerts from "./IConcerts";
import IEnsembles from "./IEnsembles";
import IHero from "./IHero";
import IHome from "./IHome";
import IImpressum from "./IImpressum";
import IProjects from "./IProjects";
import ISettings from "./ISettings";
import ISlider from "./ISlider";
import IVideos from "./IVideos";
import Menu from "./IMenu";

export default interface IData {
  timeStamp: string;
  home: IHome[];
  hero: IHero[];
  about: IAbout[];
  cv: ICV[];
  slider: ISlider[];
  videos: IVideos[];
  audio: IAudio[];
  ensembles: IEnsembles[];
  projects: IProjects[];
  concerts: IConcerts[];
  agb: IAgb[];
  impressum: IImpressum[];
  settings: ISettings[];
  menu: Menu[];
}
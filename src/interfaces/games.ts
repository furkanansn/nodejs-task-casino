interface IThumb {
    url : string;
}

interface IGames {
    id?: string;
    slug?: string;
    title?: string;
    providerName?: string;
    thumb?: IThumb;
  }
  
  export default IGames;
  
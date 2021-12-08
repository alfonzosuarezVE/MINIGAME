class imagen{
   constructor(url){
      this.url = url;
      this.load = false;
      this.imagencita = new Image;
      this.imagencita.src = this.url;
   }
}
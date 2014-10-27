var switchApp=function(path) {
  process.chdir("../"+path);
  document.location.href= "../"+path+"/index.html";
}

var appmenuclick=function(app) {
  switchApp(app.path);
}

var goHome=function() {
  switchApp("installer");
}

var createMenu=function(apps) {
      var gui = nodeRequire('nw.gui');
      var mb = new gui.Menu({type:"menubar"});

      var appsMenu= new gui.Menu();

      var appsItem = new gui.MenuItem({ label: 'Apps' });

      apps.map(function(app) {
        if (app.path=="installer") return;
        appsMenu.append(new gui.MenuItem({ label: app.title, click:appmenuclick.bind(null,app)}));
      });

      appsItem.submenu=appsMenu;

      if (mb.createMacBuiltin) mb.createMacBuiltin("node-webkit");

      mb.append(appsItem);

      var homeItem = new gui.MenuItem({ label: 'Home' ,click:goHome});
      mb.append(homeItem);

      gui.Window.get().menu = mb; 

}
var createAppMenu=function(){
      var apps=kfs.listApps();
      createMenu(apps);      
}

var timer1=setTimeout(function(){
      if (typeof kfs!="undefined") {
            createAppMenu();
            clearInterval(timer1);
      }
},200);

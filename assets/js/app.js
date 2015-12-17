var CocoDashboard = new Marionette.Application();

CocoDashboard.navigate = function(route,  options){
  options || (options = {});
  Backbone.history.navigate(route, options);
};

CocoDashboard.getCurrentRoute = function(){
  return Backbone.history.fragment
};

CocoDashboard.on("before:start", function(){
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      header: "#header-region",
      main: "#main-region",
      dialog: "#dialog-region"
    }
  });

  CocoDashboard.regions = new RegionContainer();
  CocoDashboard.regions.dialog.onShow = function(view){
    var self = this;
    var closeDialog = function(){
      self.stopListening();
      self.empty();
      self.$el.dialog("destroy");
    };

    this.listenTo(view, "dialog:close", closeDialog);

    this.$el.dialog({
      modal: true,
      title: view.title,
      width: "auto",
      close: function(e, ui){
        closeDialog();
      }
    });
  };
});

CocoDashboard.on("start", function(){
  if(Backbone.history){
    Backbone.history.start();
/*
    if(this.getCurrentRoute() === ""){
      CocoDashboard.trigger("contacts:list");
    }
*/
  }
});
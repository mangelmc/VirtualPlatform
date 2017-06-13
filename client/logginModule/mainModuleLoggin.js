
myTemplates = new ReactiveVar();
myTemplates.set("loginForm");
Template.mainModuleLoggin.helpers({
	template : function(){
		return myTemplates.get();
	}
});
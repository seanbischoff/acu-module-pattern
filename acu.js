
acu = {

	defaultYesHandler : function(){
		console.log("YES handler not configured, do nothing");
	},

	defaultNoHandler : function(){
		console.log("No handler not configured, do nothing");
	},

	initACUDialog : function(config){

		var acuClass = "acu-attention";
		var acuButtons = [
				{
					text: "Ok",
					click: function() {
						$( this ).dialog( "close" );
					}
				}];

		//if( $("#dialog").parent()[0].tagName.toLowerCase() != "body"){
			//console.log("destroy existing");
			//$("#dialog").dialog('destroy');
		//}

		if(typeof config == "string"){
			acuClass = "acu-alert";
			acuBody = config;
			acuTitle = "Alert";

		} else {
			acuBody = config.msg;
			acuTitle = config.result;
			if(config.result.toLowerCase() == "error"){
				acuClass = "acu-error";
			} else if(config.result.toLowerCase() == "success"){
				acuClass = "acu-success";
			} else if(config.result.toLowerCase() == "warning"){
				acuClass = "acu-warning";
			} else if(config.result.toLowerCase() == "confirm"){
				me = this;
				me._yesHandler = (config.yesHandler != undefined) ? config.yesHandler : defaultYesHandler;
				me._noHandler = (config.noHandler != undefined) ? config.noHandler : defaultNoHandler;
				acuClass = "";
				acuButtons = [


					{
						text: "Ok",
						click: function() {
							$( this ).dialog( "close" );
							//executeFunctionByName(_yesHandler, window, []);
							me._yesHandler();
						}
					},

				{
						text: "Cancel",
						click: function() {
							$( this ).dialog( "close" );
							//executeFunctionByName(_noHandler, window, []);
							me._noHandler();
						}
					}]
			}
		}
		
		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 400,
			dialogClass: acuClass,
			modal: true,
			close: function(event,ui){
				$(this).dialog('close');
			},
			buttons: acuButtons
		});
		$( "#dialog" ).dialog("option","title", acuTitle );
		$( "#dialog" ).html( acuBody );
		$( "#dialog" ).dialog( "open" );
	}

};

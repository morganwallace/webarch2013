
$("#error-alert").hide();
$("#name-your-home").hide();
$("#credit-card").hide();
$("#story-text").hide();
$('document').ready(function(){
	//form validation..
	errors={}
	function error_found(errors){
		for (i in errors){
			console.log(errors)
			$("#error-list").append('<a href="#'+errors[i]+'" class="alert-link"><li>"'+$("#"+errors[i]).parent().text()+'" is blank</li></a>')
			$("#"+errors[i]).parent().toggleClass("has-error");
		}
		
		$("#error-alert").fadeIn(300);
		return false
	}	
	
	//validation on Focus Out of specific fields
	$("#your-name").focusout(function(event){
		if ($("#your-name").val().length==0){
			$("#your-name").toggleClass("has-error")
		}
		else{
			if($("#your-name").hasClass("form-control")){
				$("#your-name").removeClass("has-error")	
			}
		}
	})
	
	$("#beer-fund").change(function(){
		$("#credit-card").fadeIn(300)
	})
	
	$("#pick-state").change(function(){
		if ($(this).val()=="own-state"){
			$("#name-your-home").fadeIn(300);
		}
		else{
			$("#name-your-home").hide();
		}
	})


	//clean up the validation from previous attempts
	function cleanup(){
		$("#error-alert").hide();
		$("#error-alert ul li").remove()
		$("#story-text p").remove()
	}



	//validation upon submit	
	function validate(){
		var errors=[]
		var errorFree=true;
		
		//Possible Errors
		if($("#your-name").val().length==0){
			errors.push('your-name')
			errorFree=false;
		}
		if($("#adj").val().length==0){
			errors.push('adj')
			errorFree=false;
		}
		if($("#noun").val().length==0){
			errors.push('noun')
			errorFree=false;
		}
		if($("#pick-state").val()=="--Select state"){
			errors.push('pick-state')
			errorFree=false;
		}
		if($("#pick-state").val()=="own-state"){
			if ($("#own-place").val().length==0){
				errors.push('own-place')
				errorFree=false;
			}
		}
		if($("#terms_of_use").is(":checked")==false){
			errors.push('terms_of_use')
			errorFree=false;
		}
		if($("#beer-fund").is(":checked")){
			if ($("#ccNum").val().length==0){
				errors.push('ccNum')
				errorFree=false;
			}
			/*
			//incomplete checksum credit card validator
else{
				cardNo=$("#ccNum").val()
				var checkSum = String(cardNo).charAt(cardNo.length - 1)
			}
*/
		}
		
		// CLEAN OF ERRORS
		if (errorFree==true){
			
			//state
			var state=''
			if ($("#pick-state").val()=="own-state"){state=$("#own-place").val()}
			else{
				state=$("#pick-state").val()}
			
			//append story text
			$("#story-text").append("<p>In "+state+", the home of "+$("#your-name").val()+", there was a man riding on the '"+$("#adj").val()+" "+$("#noun").val()+"' - the fastest "+$("input:radio[name=vehicle-radio]:checked").val()+" in the galaxy.</p>");
			$("#story-text").fadeIn(300);
		}
		
		//alert user of errors
		else{
			error_found(errors)
		}
	}
	
	// Submitting our form
	$('#madlibForm').submit(function(event){
		cleanup()
	   validate()
	   return false;
	});
	
})
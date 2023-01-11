fg_storage=localStorage.getItem("fg_color")
bg_storage=localStorage.getItem("bg_color")
if (fg_storage !== null || bg_storage !== null){
	let root=document.documentElement
	let fg=document.getElementById("fg_input")
	let bg=document.getElementById("bg_input")
	root.style.setProperty('--foreground', fg_storage)
	root.style.setProperty('--background', bg_storage)
	fg.value=fg_storage
	bg.value=bg_storage
}

function search(){
	let searchterm=document.getElementById("search").value
	let website="google"
	let final=""
	if (searchterm != ""){
		if (searchterm.slice(0,2)=="r/"){
			website="reddit"
		}else if (searchterm.slice(0,3)=="yt/"){
			website="youtube"
		}else if (searchterm.slice(0,3)=="gh/"){
			website="github"
		}else{
			website="google"
		}
	}
	
	if (website=="reddit"){
		searchterm=searchterm.slice(2,)
	}else if (website=="github"){
		searchterm=searchterm.slice(3,)
	}else if (website=="youtube"){
		searchterm=searchterm.slice(3,)
	}

	if (searchterm != ""){
		for (let i of searchterm){
			if (i === " "){
				final=final+"+"
			}else{
				final=final+i
			}
		}
		if (website=="google"){
			window.open("https://google.com/search?q="+final,"_self")
		}else if (website=="reddit"){
			window.open("https://reddit.com/search/?q="+final,"_self")
		}else if (website=="youtube"){
			window.open("https://www.youtube.com/results?search_query="+final,"_self")
		}else if (website=="github"){
			window.open("https://github.com/search?q="+final,"_self")
		}
	}
	document.getElementById("search").value=""
}

function handle_key_press(e){
	var x=event.code 
	if (x==="Enter"){
		search()
	}
}

function change_logo(){
	let current=document.getElementById("search").value
	if (current.slice(0,2)=="r/"){
		document.getElementById("logo").innerHTML=""
	}else if(current.slice(0,3)=="yt/"){
		document.getElementById("logo").innerHTML=""
	}else if(current.slice(0,3)=="gh/"){
		document.getElementById("logo").innerHTML=""
	}else {
		document.getElementById("logo").innerHTML=""
	}
}


function showTime(){
	let time = new Date() 
	let hour = time.getHours() 
	let min = time.getMinutes() 

	hour = hour % 12
	hour = hour ? hour : 12
	hour = hour < 10 ? "0" + hour : hour
	min = min < 10 ? "0" + min : min 

	let currentTime = hour + ":" 
			+ min 

	document.getElementById("clock")
			.innerHTML = currentTime 

}
setInterval(showTime, 1000) 
showTime()

function showDate(){
	var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
	var today = new Date()
	var dd = String(today.getDate()).padStart(2, '0') 
	var mm = String(today.getMonth() + 1).padStart(2, '0')
	var yyyy = today.getFullYear() 
	var day = today.getDay()
	let date=dd+"-"+mm+"-"+yyyy+","+days[day]
	document.getElementById("date").innerHTML=date
}

setInterval(showDate, 60000) 
showDate()

function toggle_settings(){
	let settings=document.getElementById("settings_menu")
	if(settings.style.display !== "none"){
		setTimeout(function(){settings.style.display = "none"},150) 
		settings.classList.remove('open')
		settings.classList.add('close')
	}else { 
		settings.classList.remove('close')
		settings.classList.add('open')
		settings.style.display = "block"
	}
}

function set_theme(){
	let fg=document.getElementById("fg_input")
	let bg=document.getElementById("bg_input")
	let settings=document.getElementById("settings_menu")
	let root=document.documentElement
	root.style.setProperty('--foreground', fg.value)
	root.style.setProperty('--background', bg.value)
	localStorage.setItem("fg_color", fg.value)
	localStorage.setItem("bg_color", bg.value)
	setTimeout(function(){settings.style.display = "none"},150) 
	settings.classList.remove('open')
	settings.classList.add('close')
}

function reset_theme(){
	let settings=document.getElementById("settings_menu")
	let root=document.documentElement
	let fg=document.getElementById("fg_input")
	let bg=document.getElementById("bg_input")
	root.style.setProperty('--foreground', "")
	root.style.setProperty('--background', "")
	localStorage.setItem("fg_color", "")
	localStorage.setItem("bg_color", "")
	fg.value=""
	bg.value=""
	setTimeout(function(){settings.style.display = "none"},150) 
	settings.classList.remove('open')
	settings.classList.add('close')
}

//
// suggestqueries.google.com/complete/search?client=chrome&q=<q>&hl=en
// var reg=/^#([0-9a-f]{3}){1,2}$/i; hex color verification

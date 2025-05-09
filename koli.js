var timeToListen=5000;var interval;
const recognition = new webkitSpeechRecognition() || new SpeechRecognition(); 
recognition.lang = "he-IL";
recognition.interimResults = false;
recognition.maxAlternatives = 1;
recognition.continuous = false;



function micClick() {
   startStop=0;	
const mictext=document.getElementById('resultMic').textContent;
  if(mictext.includes("עצור") ){
	startStop=1;  recognition.stop();document.getElementById('timerDisplay').style.display='none';
  }
else{
console.log("האזנה התחילה");
  document.getElementById('resultMic').textContent = " מאזין קבוע - לעצירה אמור עצור או לחץ שוב";
  recognition.start();}
}
recognition.onstart = function () {
   const timerDisplay = document.getElementById('timerDisplay');

  let secondsPassed = 0;
  timerDisplay.style.display = 'block';

  interval = setInterval(() => {
    secondsPassed++;
    timerDisplay.textContent = secondsPassed;

    if (secondsPassed * 1000 >= timeToListen) {
      clearInterval(interval);
      timerDisplay.style.display = 'none';
      recognition.stop(); // או כל פעולה אחרת
    }
  }, 1000);

   
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  console.log("קלט מהמשתמש:", transcript);
  handleSearchFromVoice(transcript);
};

recognition.onend = () => {
clearInterval(interval);
console.log("האזנה הסתיימה – מתחיל מחדש");
if(startStop===0) {recognition.start();}
else{document.getElementById('resultMic').textContent ="לא מאזין"}
};

recognition.onerror = (e) => {
  console.error("שגיאת זיהוי קולי:", e.error);
  document.getElementById("result").textContent = "שגיאה בזיהוי קולי: " + e.error;
};
function toggleMenux() {
  if(document.getElementById("hamb").className.includes('open')){
        document.getElementById("hamb").classList.remove("open");
        document.querySelector(".menu-container").style.display='none';
        document.getElementById("menu").classList.remove("open");
  }}

function hideformic() {
  hideAllimages();
  hideTkufa();
}



function handleSearchFromVoice(transcript) {
  var ifrmValue=0;
  var iframe = document.getElementById('ifrm');
  var filter = document.getElementById('filter');
  
  if (transcript.includes("קצר")) {timeToListen=5000;}
  else if (transcript.includes("בינוני") || transcript.includes("בנוני"))
    {timeToListen=10000;}
  else if (transcript.includes("ארוך")) {timeToListen=17000;}

 
if(iframe){
  
	  var iframeCont=iframe.contentWindow;
    if(iframe.style.display==='none'){ifrmValue=0;}
    else if(!iframe.src.includes("Machshevonim")) {ifrmValue=1;}

}	
if(!transcript){return};	

	if ((transcript.includes("קשר") || transcript.includes("סוכן"))) {yossi();
	}
	else if (Swal.isVisible()) {
		if (transcript.includes("מאשר") && !transcript.includes("לא") ) {
			const checkbox = document.getElementById("swal-checkbox");
			if (checkbox && !checkbox.checked) {
				checkbox.checked = true;
			}

			const confirmBtn = document.querySelector(".swal2-confirm");
			if (confirmBtn) {
				confirmBtn.click();
			}
		} else if (transcript.includes("לא מאשר") || transcript.includes("לא")) {
			const cancelBtn = document.querySelector(".swal2-cancel");
			if (cancelBtn) {
				cancelBtn.click();
			}
		}
	}

 	else if (transcript.includes("ראש")  && ifrmValue===1 && !iframe.src.includes('riskQuest')) {iframeCont.scrollTo(0, 0);
	}
	else if (transcript.includes("ראש")  && ifrmValue===0) {window.scrollTo(0, 0);
	}
	else if (transcript.includes("תחתית")) {window.scrollTo({
         top: document.body.scrollHeight,
          behavior: 'smooth'});}
	
  else if ((transcript.includes("הלוואות") || transcript.includes("הלוואה") || transcript.includes("שפיצר")) && ifrmValue === 0) {
    hideformic();
    showIframe("loan.html");

    const iframe = document.getElementById("ifrm");
    document.getElementById('ifrm').onload = function() {
        handleLoan(transcript);
    };
}
  else if ((transcript.includes("דריבית") || transcript.includes("ערך עתידי"))
  && ifrmValue === 0) {
	
    hideformic(); showIframe("ribitderibit.html");
	const iframe = document.getElementById("ifrm");
      document.getElementById('ifrm').onload = function() {
        handleCompoundInterest(transcript);
    };
  }
  else if ((transcript.includes("דמי ניהול") || transcript.includes("ניהול")) && ifrmValue===0) {
    hideformic(); showIframe("hashDmeyNihul.html");
       document.getElementById('ifrm').onload = function() {
      handleHashDmeyNihul(transcript);
    }
  }
  
  else if ((transcript.includes("תשואה") || transcript.includes("תשואות")) && ifrmValue===1) {
	const pianoach=handleInput(transcript);
  }
  else if ((transcript.includes("הפקדה חודשית") || transcript.includes("יעד") 
  || transcript.includes("סכום יעד")) && ifrmValue===0) {
    hideformic(); showIframe("hafkada.html");
    document.getElementById('ifrm').onload = function() {
      handleYaad(transcript);
    }
  }
  else if (transcript.includes("מחשבונים") || transcript.includes("פיננסיים")) {
    hideformic(); showIframe("Machshevonim.html");
  }
  else if ((transcript.includes("השוואה") || transcript.includes("השוואת")
	)
  && ifrmValue===0) {
    if (transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html");
	  const iframe = document.getElementById("ifrm");
    	iframe.onload = function() {
        handleMenahalot(transcript);
    };

    }
    else if (transcript.includes("חשיפות")) {
      hideformic(); showIframe("hasifotMeshulav.html");
    }
   else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
     hideformic(); 
     hideAllimages(); 
     createForm(0);handleSharp(transcript)
    }
    
    else if (transcript.includes("משולב") || transcript.includes("תיק")) {
      hideformic(); showIframe("VirtualInvest.html");
    }
    else {
      hideformic(); showIframe("hashvaotRikuz.html");
    }
  }
  else if(transcript.includes("מנהלות") || transcript.includes("מנהלת")) {
      hideformic(); showIframe("hashMenahalot.html");
    }
    else if(transcript.includes("חשיפות") && !document.getElementById('ifrm').src.includes('riskQuest')) {
      hideformic(); showIframe("hasifotMeshulav.html");
    const iframe = document.getElementById("ifrm");
    	iframe.onload = function() {
        handleHasifot(transcript);}
    }
    else if (transcript.includes("שארפ") || transcript.includes("שרפ")) {
      hideAllimages(); createForm(0);handleSharp(transcript)
    }
    else if(transcript.includes("משולב") || transcript.includes("תיק")) {
      hideformic(); showIframe("VirtualInvest.html");
    }
  else if(transcript.includes("מקצועי") || transcript.includes("מידע")) {
    if (transcript.includes("קרנות השתלמות")) {
      hideformic(); showIframe("hishtalmotMikzoei.html");
    }
    else if (transcript.includes("קרנות פנסיה")) {
      hideformic(); showIframe("pensiaMikzoei.html");
    }
    else if (transcript.includes("השקעה")) {
      hideformic(); showIframe("hashkaaMikzoei.html");
    }
    else if (transcript.includes("ילד")) {
      hideformic(); showIframe("hisyeled.html");
    }
    else if (transcript.includes("פוליסות")) {
      hideformic(); showIframe("polisotMikzoei.html");
    }
    else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      hideformic(); showIframe("kupatgemelmikzoei.html");
    }
    else {
      hideformic(); showIframe("meidaMikzoei.html");
    }
  }
  else if (transcript.includes("קרנות השתלמות") && !transcript.includes("מקצועי")
	  && ifrmValue === 0) {
    showKupaMeida('pHish'); hideMaBaatar(); maslulim(30,'קרנות השתלמות',0);
  }
  else if (transcript.includes("קרנות פנסיה") && !transcript.includes("מקצועי") && ifrmValue === 0 ) {
    showKupaMeida('pPensia'); hideMaBaatar(); maslulimP(30,'קרנות חדשות',0);
  }
  else if (transcript.includes("השקעה") && !transcript.includes("מקצועי")
	 && ifrmValue === 0) {
    showKupaMeida('pHash'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה',0);
  }
  else if (transcript.includes("ילד") && !transcript.includes("מקצועי") && ifrmValue === 0) {
    showKupaMeida('pYeled'); hideMaBaatar(); maslulim(30,'קופת גמל להשקעה - חסכון לילד',0);
  }
  else if (transcript.includes("פוליסות") && !transcript.includes("מקצועי") && ifrmValue === 0) {
    showKupaMeida('pPolisa'); hideMaBaatar(); maslulim(30,'פוליסות חסכון',0);
  }
  else if (transcript.includes("גמל") && !transcript.includes("השקעה") && !transcript.includes("מקצועי")
	   && ifrmValue === 0 ) {
    showKupaMeida('pGemel'); hideMaBaatar(); maslulim(30,'תגמולים ואישית לפיצויים',0);
  }
  else if (((transcript.includes("דף") || transcript.includes("חזור") || transcript.includes("הבית"))) 
&& !transcript.includes("ראש")) {
    hideframe(); showAllimages(); 
  }
  else if (transcript.includes("שימוש") || transcript.includes("תנאי")) {
    showIframe('tnaiyShimosh.html');
  }
  else if ((transcript.includes("שאלון") || transcript.includes("סיכון") ) && ifrmValue ===0 ) {
    showIframe('riskQuest.html');
    const iframe=
    document.getElementById('ifrm');
    
    iframe.onload=function(){
      iframe.contentWindow.sheelon();
      handleSheelon(transcript);
    }
    
  }
  else if (transcript.includes("עצור") || transcript.includes("הפסק") || transcript.includes("צליל")) {
	startStop=1;
	  
    }
	else if (transcript.includes("הסבר") || transcript.includes("הוראות קוליות") || transcript.includes("הוראות")) {
		showIframe('koliHes.html');
	  
    }
	else if (transcript.includes("תקרות") || transcript.includes("תקרות הפקדה")) {
		showIframe('tikrot.html');
	  
    }
	else if (transcript.includes("מסלול") ) {
		const match = transcript.match(/מסלול\s+(\S+)/);
			if (match) {
				searchMh(match[1]); 
		}

		else{alert("אמור מסלול + מספר מסלול")}	  
    }


	else if ((transcript.includes("גלול למטה") || transcript.includes('למטה')) &&
	ifrmValue===1 ) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}	
		else{
			var tvach=300
			var minustvach=-300
		}
    
    	if (iframeCont.scrollY + tvach > iframeCont.document.body.scrollHeight - iframeCont.innerHeight) {
       	 iframeCont.scrollTo(0, iframeCont.document.body.scrollHeight - iframeCont.innerHeight);
    	} else {
        	iframeCont.scrollBy(0, tvach);
    	}
	}

	else if ((transcript.includes("גלול למעלה") || transcript.includes('למעלה')) &&
	ifrmValue===1) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
		if (iframeCont.scrollY - tvach < 0) {
			iframeCont.scrollTo(0, 0);
		} else {
			iframeCont.scrollBy(0, minustvach);
		}
	}

	else if (transcript.includes("גלול למטה") || transcript.includes('למטה')) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
	if(window.scrollY+tvach>document.scrollHeight-window.innerHeight){
		window.scrollBy(0,document.scrollHeight-window.innerHeight)
	}	
	else{window.scrollBy(0,tvach)}
	  
    }
	else if (transcript.includes("גלול למעלה") || transcript.includes('למעלה')) {
		if(transcript.includes("הרבה")){
			var tvach=700;
			var minustvach=-700;
		}
		else if(transcript.includes("קצת")){
			var tvach=150;
			var minustvach=-150;
		}
		else{
			var tvach=300
			var minustvach=-300
		}
		if(window.scrollY-tvach<0){
		window.scrollTo(0,0)
	}	
	else{window.scrollBy(0,minustvach)}
	  
    }
	else if(iframe  ){

		if(iframe.src.includes("loan")){
		handleLoan(transcript);return
		}
		else if(iframe.src.includes("ribitderibit")){
			handleCompoundInterest(transcript);return;	
		}
		else if(iframe.src.includes("hashMenahalot")){
			handleMenahalot(transcript);return;	
		}
    else if(iframe.src.includes("hashDmeyNihul")){
      handleHashDmeyNihul(transcript);return;	
    }
    else if(iframe.src.includes("hafkada")){
      handleYaad(transcript);return;	
    }
    else if(iframe.src.includes("hasifotMeshulav")){
      handleHasifot(transcript)
    }
      else if(iframe.src.includes('riskQuest')) {
        handleSheelon(transcript);handleSheelon(transcript);
      } 
   }	
else if(document.getElementById('filter').style.display==='flex'){
	  handleSharp(transcript);return;	
	}
  else if(transcript.includes("הדפס") || transcript.includes("pdf")){ 	   
    window.exportToPDF();   
  
  }	
  	else {
  	  if(!transcript.includes('קצר') && !transcript.includes('בינוני') &&!transcript.includes('ארוך')){
        Swal.fire({
          html: "<span style='color: green; font-size: 16px;'>הבקשה אינה ברורה - אמור שוב</span>",
          width: "clamp(300px, 90vw, 600px)",
          position: "center", 
          timer: 2000, 
          showConfirmButton: false,
          timerProgressBar: true, 
          background: "#fff",
          customClass: {
            popup: 'swal2-center-custom'
          }
        });
        }
    	
 	 }
	
}
		
function handleLoan(transcript) {
	console.log("🔍 טקסט שזוהה:", transcript);
	const iframex = document.getElementById('ifrm');
	const loanDoc = iframex.contentWindow.document;
	const loanWindow = iframex.contentWindow;
	const loanAmountInput = loanDoc.getElementById('loan-amount');
	const termfor = loanDoc.getElementById('loan-term');
	const interestfor = loanDoc.getElementById('interest-rate');
	const delayfor = loanDoc.getElementById('payment-delay');

	const pianoach=handleInput(transcript);
	console.log(pianoach);


	// סכום
	if (pianoach.amount) {  
		loanAmountInput.value = pianoach.amount;
		loanDoc.getElementById('loan-amount-range').value=pianoach.amount;
		console.log("📌 סכום זוהה:", pianoach.amount);
	}

	// גרייס
	if (pianoach.grace) {		
	         delayfor.value = pianoach.grace;
		loanDoc.getElementById('payment-delay-range').value=pianoach.grace;
		console.log("📌 גרייס זוהה:", pianoach.grace, "חודשים");	
	}
	else if (transcript.includes("גרייס") ) {		
		delayfor.value = '';
		loanDoc.getElementById('payment-delay-range').value=0;
		console.log("📌 גרייס זוהה:", "ללא גרייס");
	}
	// תקופה 
	if (pianoach.term) {		
		termfor.value = pianoach.term;
		loanDoc.getElementById('loan-term-range').value=pianoach.term;
		console.log("📌 תקופה זוהתה:", pianoach.term, "חודשים");		
	}

	// ריבית
	if (pianoach.interest) {		
		interestfor.value = pianoach.interest;
		loanDoc.getElementById('interest-rate-range').value=pianoach.interest;
		console.log("📌 ריבית זוהתה:", pianoach.interest + "%");	
	}

	// הפעלת מחשבון רק אם כל השדות מולאו
	if (termfor.value && interestfor.value && loanAmountInput.value) {
		loanWindow.calculateLoan();
	}

	// לוח סילוקין
	if (transcript.includes("סילוקין") || transcript.includes("לוח") || transcript.includes("הסתר")) {
		loanWindow.toggleAmortizationTable();
	}
}

 
function handleCompoundInterest(transcript) {
  console.log("🔍 טקסט שזוהה:", transcript);

  const iframex = document.getElementById('ifrm');
  const compoundDoc = iframex.contentWindow.document;
  const compoundWindow = iframex.contentWindow;
  const initialAmountInput = compoundDoc.getElementById('hadpeami');
  const monthlyDepositInput = compoundDoc.getElementById('hodshi');
  const termInput = compoundDoc.getElementById('txttkofa1');
  const interestRateInput = compoundDoc.getElementById('selecttoz');
  const DmeyNihulInput= compoundDoc.getElementById('txttkofa2');
  const tesuaInput= compoundDoc.getElementById('selectoz');

  const pianoach=handleInput(transcript);
  console.log(pianoach.tesua);

  	// סכום
	if (pianoach.had) {  
		initialAmountInput.value = pianoach.had;
		console.log("📌 סכום חד פעמי:", pianoach.had);
	}
	if (pianoach.hodshi) {  
		monthlyDepositInput.value = pianoach.hodshi;
		console.log("📌 סכום חודשי:", pianoach.hodshi);
		
	}

	if (pianoach.term) {	
			termInput.value = pianoach.term;
			console.log("📌 תקופה זוהתה:", pianoach.term, "שנים");
	}

	// ריבית
	if (pianoach.interest) {		
		interestRateInput.value = pianoach.interest/100;
		compoundDoc.getElementById("kottoz").textContent = `לפי ריבית ${pianoach.interest}% שנתי:`;
			console.log("📌 ריבית זוהתה:", interestRateInput.value + "%");	
	}

  if (pianoach.dmey) {
    
    DmeyNihulInput.value = pianoach.dmey;
    console.log("📌 דמי ניהול שזוהו:", pianoach.dmey + "%");
  }
 

  // הפעלת חישוב אם כל השדות מולאו
  if (initialAmountInput.value && monthlyDepositInput.value && termInput.value) {
    if (interestRateInput.value) {
      compoundWindow.hashev(interestRateInput.value);
      console.log("✅ הופעל בריבית:", interestRateInput.value / 100);
    } else {
      compoundWindow.hashev(0.04);
      console.log("✅ הופעל hashev(0.04) כברירת מחדל");
    }
	
  }
}
function handleMenahalot(transcript) {

  const iframex = document.getElementById('ifrm');
  const menahalotDoc = iframex.contentWindow.document;
  const menahalotWindow = iframex.contentWindow;
  const rd1=menahalotDoc.getElementById('radio1');
  const rd2=menahalotDoc.getElementById('radio2'); 
  const selmenu1 = menahalotDoc.getElementById('selmen1');
  const selmenu2 = menahalotDoc.getElementById('selmen2'); 
	var input='';
  if (transcript.includes("שתי") || rd2.checked===true) {
	console.log("שתי חברות נבחרו");
	rd2.checked=true;
	menahalotDoc.getElementById('form2').style.display='flex';
	menahalotDoc.getElementById('form1').style.display='none';

	


	if (transcript.includes("מובילה") || transcript.includes("מול")) {
		if (transcript.includes("מובילה") && transcript.includes("מול")){
			const matchtext=transcript.split("מול");
			input=matchHevra(matchtext[0].trim());
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu1.value = match;
			console.log("מובילה",match);
			input=matchHevra(matchtext[1].trim());
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu2.value = match;
			console.log("מול",match);
			
		}
		
		else if(transcript.includes("מובילה")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu1.value = match;
		}
		else if(transcript.includes("מול")){
			input=matchHevra(transcript);
			var match = gufmosdixA.find(name => name.includes(input));
			selmenu2.value = match;
		}
		
		
	}	
	
	if(transcript.includes("השווה") || transcript.includes("השוואה") || transcript.includes("בצע")
		||  transcript.includes("בצא")){
		const iframe = document.getElementById('ifrm');
		var iframeCont=iframe.contentWindow;
		menahalotWindow.compare2();
		iframeCont.scrollBy(0, window.innerHeight*0.8);
			
		}	
		if(transcript.includes("הדפס") || transcript.includes("pdf")){ 	   
        menahalotWindow.pdfDo();   
			
		}	
		
}


	if (transcript.includes("מרובה")) {
		rd1.checked=true;
		menahalotWindow.selchange()}
	
	}
function handleSharp(transcript) {
  
        var sugmM=document.getElementById('sugM');        
        
        if (transcript.includes("השתלמות")) {
            sugmM.selectedIndex=0;	
        }
        else if (transcript.includes("פנסיה")) {
            sugmM.selectedIndex=4	;
	}
        else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {sugmM.selectedIndex=1;	
        }
        else if (transcript.includes("השקעה")) {
            sugmM.selectedIndex=2;	

}
        else if (transcript.includes("חסכון") || transcript.includes("חיסכון")) {
            sugmM.selectedIndex=3;	
}  
        
            tablhasifot()
            window.scrollBy(0, window.innerHeight*0.8);
                  
      }
          
function handleHashDmeyNihul(transcript) {
  const iframex = document.getElementById('ifrm');
  const dmeyNihultDoc = iframex.contentWindow.document;
  const dmeyNihulWindow = iframex.contentWindow;
  const rd1=dmeyNihultDoc.getElementById('rd1');
  const rd2=dmeyNihultDoc.getElementById('rd2'); 
  const rd3=dmeyNihultDoc.getElementById('rd3');
  const savingAmount=dmeyNihultDoc.getElementById('savingAmount');
  const depositAmount=dmeyNihultDoc.getElementById('depositAmount');
  const saving=dmeyNihultDoc.getElementById('saving');
  const deposit=dmeyNihultDoc.getElementById('deposit');
  const age=dmeyNihultDoc.getElementById('age');
  const alltoz=dmeyNihultDoc.getElementById("alltoz");
  const feeSaving1=dmeyNihultDoc.getElementById("feeSaving1");
  const feeDeposit1=dmeyNihultDoc.getElementById("feeDeposit1");
  const feeSaving2=dmeyNihultDoc.getElementById("feeSaving2");
  const feeDeposit2=dmeyNihultDoc.getElementById("feeDeposit2");
  const selecttoz=dmeyNihultDoc.getElementById("selecttoz");
  
  
  if (transcript.includes("סוג")){
    alltoz.style.display="none";
    if (transcript.includes("צבירה") && !transcript.includes("חודשי")) {rd1.checked=true;}
    else if (transcript.includes("חודשי") && !transcript.includes("צבירה")) {rd2.checked=true;}
    else if (transcript.includes("חודשי") && transcript.includes("צבירה")) {rd3.checked=true;}
    dmeyNihulWindow.updateFields();
  }
  if (transcript.includes("סכום")){
    if (transcript.includes("חודשי") || transcript.includes("הפקדה") 
    ) {
      
        depositAmount.value = extractAmounta(transcript);
        alltoz.style.display="none";
    }
    else if (transcript.includes("צבירה")) {
     
        savingAmount.value = extractAmounta(transcript);console.log("צבירה",savingAmount.value); 
        alltoz.style.display="none";
      }

  }
  if(transcript.includes("גיל")){
    age.value = extractAmounta(transcript);
    dmeyNihulWindow.onch();
  }
  if(transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
    || transcript.includes("חישוב")){
    dmeyNihulWindow.hashev(0.04);dmeyNihulWindow.scrollBy(0, 300);
  }
  if(transcript.includes("דמי ניהול") && transcript.includes("צבירה")){
    if(transcript.includes("קיים") ){
      const match=handleInput(transcript)
      feeSaving1.value = match.dmey;

    }
    if(transcript.includes("חדש") ){
      const match=handleInput(transcript)
      feeSaving2.value = match.dmey;

    }
    alltoz.style.display="none";
   }
   if(transcript.includes("דמי ניהול") && (transcript.includes("הפקדה") ||
   transcript.includes("פרמיה"))){
    if(transcript.includes("קיים") ){
      const match=handleInput(transcript)
      feeDeposit1.value = match.dmey;
    }
    if(transcript.includes("חדש")  ){
      const match=handleInput(transcript)
      feeDeposit2.value = match.dmey;
    }
    alltoz.style.display="none";
    }
    if(transcript.includes("ריבית") ){
      const match=handleInput(transcript)
      selecttoz.value = match.interest/100;
      if(!alltoz.style.display==="none"){
      dmeyNihulWindow.hashev(match.interest/100);
      dmeyNihultDoc.getElementById("kottoz").textContent = `לפי ריבית ${match.interest}% שנתי:`;
      if(window.innerWidth<400){ dmeyNihulWindow.scrollBy(0, 350);}

      }
    }
  
}      
function handleYaad(transcript) {
  const iframex = document.getElementById('ifrm');
  const yaadDoc = iframex.contentWindow.document;
  const yaadWindow = iframex.contentWindow;
  const targetAmount=yaadDoc.getElementById('targetAmount');
  const targetAmountSlider=yaadDoc.getElementById('targetAmount_slider'); 
  
  const initialAmount=yaadDoc.getElementById('initialAmount');
  const initialAmountSlider=yaadDoc.getElementById('initialAmount_slider');
  
  const interestRate=yaadDoc.getElementById('interestRate');
  const interestRateSlider=yaadDoc.getElementById('interestRate_slider');


  const managementFee=yaadDoc.getElementById('managementFee');
  const managementFeeSlider=yaadDoc.getElementById('managementFee_slider');

  const years=yaadDoc.getElementById('years');
  const yearsSlider=yaadDoc.getElementById('years_slider');

  if(transcript.includes("דמי ניהול") || transcript.includes("ניהול")){
      const match=handleInput(transcript)
      managementFee.value = match.dmey;
      managementFeeSlider.value = match.dmey;
      if(window.innerWidth<400){
        managementFeeSlider.scrollIntoView({ behavior: "smooth", block: "start" })};
    }
    if((transcript.includes("יעד") || transcript.includes("יד")) && transcript.includes("סכום")){
      const match=handleInput(transcript)
      targetAmount.value = match.amount;
      targetAmountSlider.value = match.amount;
      
    }
    if(transcript.includes("התחל")  && transcript.includes("סכום")){
      const match=handleInput(transcript)
      initialAmount.value = match.amount;
      initialAmountSlider.value = match.amount;
      if(window.innerWidth<400){
        initialAmount.scrollIntoView({ behavior: "smooth", block: "start" })};
      
    }
    if(transcript.includes("ריבית") ){
      const match=handleInput(transcript);
      interestRate.value = match.interest;
      interestRateSlider.value = match.interest;
      if(window.innerWidth<400){
        interestRateSlider.scrollIntoView({ behavior: "smooth", block: "start" })};
      
    }
    if(transcript.includes("תקופ")){
      const match=handleInput(transcript);
      years.value = match.term;
      yearsSlider.value = match.term;
    }
    if(transcript.includes("בצע") || transcript.includes("בצא") || transcript.includes("חשב")
      || transcript.includes("חישוב")){
      yaadWindow.calculateMonthlyDeposit();
      yaadDoc.getElementById("result").scrollIntoView({ behavior: "smooth", block: "start" });
    }
//yaadWindow.calculateMonthlyDeposit()
  
 
}

function handleHasifot(transcript) {
  const iframex = document.getElementById('ifrm');
  const hasifotDoc = iframex.contentWindow.document;
  const hasifotWindow = iframex.contentWindow;

  const sugmM = hasifotDoc.getElementById('product');
  const stocks = hasifotDoc.getElementById('stocks');
  const abroad = hasifotDoc.getElementById('abroad');
  const currency = hasifotDoc.getElementById('currency');

  // בחירת מוצר
  if (transcript.includes('מוצר')) {
    if (transcript.includes("השתלמות")) {
      sugmM.selectedIndex = 1;
    } else if (transcript.includes("פנסיה")) {
      sugmM.selectedIndex = 3;
    } else if (transcript.includes("גמל") && !transcript.includes("השקעה")) {
      sugmM.selectedIndex = 2;
    } else if (transcript.includes("השקעה")) {
      sugmM.selectedIndex = 5;
    } else if ((transcript.includes("חסכון") || transcript.includes("חיסכון")) && !transcript.includes("ילד")) {
      sugmM.selectedIndex = 4;
    } else if (transcript.includes("ילד")) {
      sugmM.selectedIndex = 6;
    }

    if (sugmM.value !== '') {
      hasifotWindow.submitForm(sugmM);
    }
  }

  // פונקציה עזר להצבת אחוזים
  function setSelectByPercentage(transcript, element) {
    if (transcript.includes('עד חמש עשרה') || transcript.includes('15')) {
      element.selectedIndex = 1;
    } else if (transcript.includes('עד שלושים') || transcript.includes('30')) {
      element.selectedIndex = 2;
    } else if (transcript.includes('עד חמישים') || transcript.includes('50')) {
      element.selectedIndex = 3;
    } else if ((transcript.includes('עד שיבעים') || transcript.includes('עד שבעים') || transcript.includes('70')) && !transcript.includes('מעל')) {
      element.selectedIndex = 4;
    } else if (transcript.includes('מעל')) {
      element.selectedIndex = 5;
    }

    if (element.value !== '') {
      hasifotWindow.doTheCircle(element);
    }
  }

  // מניות
  if (transcript.includes('מניות') && sugmM.value !== '') {
    setSelectByPercentage(transcript, stocks);
    hasifotWindow.hasifch(stocks);hasifotWindow.submitForm(stocks)
  }

  // חול
  if (transcript.includes('חול') && sugmM.value !== '') {
    setSelectByPercentage(transcript, abroad);
    hasifotWindow.hasifch(abroad);hasifotWindow.submitForm(abroad)
  }

  // חוץ (מט"ח)
  if ((transcript.includes('חוץ')|| transcript.includes('מטח')) && sugmM.value !== '') {
    setSelectByPercentage(transcript, currency);
    hasifotWindow.hasifch(currency);hasifotWindow.submitForm(currency)
    
  }
}


function extractAmounta(text) {
    const units = {
      "אפס": 0, "אפסים": 0,
      "אחד": 1, "אחת": 1,
      "שתיים": 2, "שניים": 2, "שתי": 2,"שני": 2,"שניי": 2,
      "שלוש": 3, "שלושה": 3, "שלושת": 3,
      "ארבע": 4, "ארבעה": 4, "ארבעת": 4,
      "חמש": 5, "חמישה": 5, "חמשת": 5,
      "שש": 6, "שישה": 6, "ששת": 6,
      "שבע": 7, "שבעה": 7, "שבעת": 7,
      "שמונה": 8, "שמונת": 8,
      "תשע": 9, "תשעה": 9, "תשעת": 9,
      "עשר": 10, "עשרה": 10, "עשרת": 10,
      "אלפיים": 2000
    };
    const teens = {
      "אחת עשרה": 11, "אחד עשר": 11, "שתים עשרה": 12, "שניים עשר": 12,
      "שלוש עשרה": 13, "שלושה עשר": 13, "ארבע עשרה": 14, "ארבעה עשר": 14,
      "חמש עשרה": 15, "חמישה עשר": 15, "שש עשרה": 16, "שישה עשר": 16,
      "שבע עשרה": 17, "שבעה עשר": 17, "שמונה עשרה": 18, "שמונה עשר": 18,
      "תשע עשרה": 19, "תשעה עשר": 19
    };
    const tens = {
      "עשרים": 20, "שלושים": 30, "ארבעים": 40,
      "חמישים": 50, "שישים": 60, "שבעים": 70,
      "שמונים": 80, "תשעים": 90
    };
    const hundreds = {
      "מאה": 100, "מאתיים": 200, "שלוש מאות": 300, "ארבע מאות": 400,
      "חמש מאות": 500, "שש מאות": 600, "שבע מאות": 700,
      "שמונה מאות": 800, "תשע מאות": 900
    };
    const bigNumbers = { "אלף": 1000, "מיליון": 1000000, "אלפים": 1000 };
    const fractions = { "חצי": 0.5, "שליש": 1/3, "שלושת רבעי": 0.75, "רבע": 0.25 };
    const multipliers = { "כפול": true, "פי": true };

    let total = 0, currentGroup = 0, multiplyNext = 1;
    const cleanedText = text.replace(/[,\-]/g, ' ').replace(/\s+/g, ' ').replace(/(^ו)|(\sו)/g, ' ').trim();
    const words = cleanedText.split(' ');

    for (let i = 0; i < words.length; i++) {
      let word = words[i].trim();
      if (!word) continue;
      if (multipliers[word]) { multiplyNext = currentGroup || 1; currentGroup = 0; continue; }
      if (/^\d+$/.test(word)) { currentGroup += parseInt(word); continue; }
      if (i + 1 < words.length) {
        const twoWords = word + ' ' + words[i + 1];
        if (teens[twoWords]) { currentGroup += teens[twoWords]; i++; continue; }
        if (hundreds[twoWords]) { currentGroup += hundreds[twoWords]; i++; continue; }
      }
      if (units[word]) currentGroup += units[word];
      else if (tens[word]) currentGroup += tens[word];
      else if (hundreds[word]) currentGroup += hundreds[word];
      else if (bigNumbers[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * bigNumbers[word];
        currentGroup = 0;
      }
      else if (fractions[word]) {
        if (currentGroup === 0) currentGroup = 1;
        total += currentGroup * fractions[word];
        currentGroup = 0;
      }
    }
    total += currentGroup;
    total *= multiplyNext;
    return total || null;
  }

function extractInterestRatea(text) {
  text = text.replaceAll("אחוזים", "אחוז").replaceAll("%", "אחוז").trim();
console.log("🔍 טקסט שזוהה:", text);
const wordMap = {
  "אחת": 1, "אחד": 1, "שתיים": 2, "שניים": 2, "שני": 2, "שניי": 2,
  "שלוש": 3, "שלושה": 3, "ארבע": 4, "ארבעה": 4,
  "חמש": 5, "חמישה": 5, "שש": 6, "שישה": 6,
  "שבע": 7, "שבעה": 7, "שמונה": 8,
  "תשע": 9, "תשעה": 9
};

function getDecimalWord(word) {
  return wordMap[word] ?? null;
}

// תבנית: "שלושה נקודה חמש"
const match = text.match(/(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*נקודה\s*(אחת|אחד|שתיים|שניים|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)/);
if (match) {
  const intPart = getDecimalWord(match[1]);
  const decimalPart = getDecimalWord(match[2]);
  if (intPart != null && decimalPart != null) {
    return parseFloat(`${intPart}.${decimalPart}`);
  }
}

// תבנית: מספר ספרתי רגיל
const digitMatch = text.match(/(\d+(?:\.\d+)?)\s*אחוז/);
if (digitMatch) return parseFloat(digitMatch[1]);

// תבנית: "שישה אחוז"
const wordOnlyMatch = text.match(/(אחת|אחד|שתיים|שניים|שני|שלוש|שלושה|ארבע|ארבעה|חמש|חמישה|שש|שישה|שבע|שבעה|שמונה|תשע|תשעה)\s*אחוז/);
if (wordOnlyMatch) {
  const val = getDecimalWord(wordOnlyMatch[1]);
  if (val != null) return val;
}

return null;
  }

function handleInput(text) {

// חילוץ ממוקד לפי הקשר ולא לפי סדר בטקסט
const hadMatch = text.match(/(?:סכום\s+)?חד\s*פעמי\s+(.*?)(?=(סכום|חודשי|ריבית|תקופה|גרייס|$))/);
const hodshiMatch = text.match(/(?:סכום\s+)?חודשי\s+(.*?)(?=(סכום|חד\s*פעמי|ריבית|תקופה|גרייס|$))/);
const amountMatch = text.match(/(?:סכום\s+)(?!חודשי)(?!חד\s*פעמי)(.*?)(?=(חד\s*פעמי|חודשי|ריבית|תקופה|גרייס|$))/);
const interestMatch = text.match(/(?:ריבית\s*(של)?\s*)(.*?)(?=(סכום|תקופה|גרייס|$))/);
const termMatch = text.match(/(?:תקופ[ה|ת]\s*(של)?\s*)(.*?)(?=(ריבית|סכום|גרייס|$))/);
const graceMatch = text.match(/(?:גרייס\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
const dmeyMatch = text.match(/(?:ניהול\s*(של)?\s*)(.*?)(?=(ריבית|תקופה|סכום|$))/);
//const tesuaMatch = text.match(/(?:תשוא[אה]?|תשועה)\s*(של)?\s*(.*?)(?=(ריבית|תקופה|סכום|$))/);

  // טקסטים
const hadText = hadMatch ? hadMatch[1] : '';
const hodshiText = hodshiMatch ? hodshiMatch[1] : '';
const amountText = amountMatch ? amountMatch[1] : '';
const interestText = interestMatch ? interestMatch[2] : '';
const dmeyText = dmeyMatch ? dmeyMatch[2] : '';
const termText = termMatch ? termMatch[2] : '';
const graceText = graceMatch ? graceMatch[2] : '';


// המרות
const had = extractAmounta(hadText);
const hodshi = extractAmounta(hodshiText);
const amount = extractAmounta(amountText);
const interest = extractInterestRatea(interestText);
const term = extractAmounta(termText);
const grace = extractAmounta(graceText);
const dmey = extractInterestRatea(dmeyText);


  return {
  had: had,
  hodshi: hodshi,
  amount: amount,
  interest: interest,
  term: term,
  grace: grace,
  dmey: dmey,

  
      
};
}
function matchHevra(transcript){
	if (transcript.includes("מגדל")) {return "מגדל";}
	else if (transcript.includes("הראל")) {return  "הראל";}
	else if (transcript.includes("כלל")) {return  "כלל";}
	else if (transcript.includes("מנורה")) {return  "מנורה";}
	else if (transcript.includes("אלטשולר")) {return "אלטשולר";}
	else if (transcript.includes("פניקס")) {return  "פניקס";}
	else if (transcript.includes("מור")) {return  "מור";}
	else if (transcript.includes("ילין")) {return  "ילין";}
	else if (transcript.includes("אנליסט")) {return  "אנליסט";}
	else if (transcript.includes("מיטב")) {return  "מיטב";}
	else if (transcript.includes("אינפי") || transcript.includes("אנפי")) {return "אינפיניטי";}
}
function handleSheelon(transcript){
  const iframeWindow=document.getElementById('ifrm').contentWindow;
  const sheala=matchSheala(transcript);
  
  const teshuva= matchTeshuva(transcript);
 
  
  if(sheala && teshuva){
    if(!transcript.includes('שישית')){
  iframeWindow.document.querySelector(`input[name="${matchSheala(transcript)}"]`) .scrollIntoView({ behavior: "smooth", block: "start" });
 }
    iframeWindow.document.querySelector(`input[name="${matchSheala(transcript)}"][value="${matchTeshuva(transcript)}"]`).checked = true;
  }
  if(transcript.includes('חשב') || transcript.includes('בצע')){
    iframeWindow.calculateRisk();
  }
   if(transcript.includes('עבור') || transcript.includes('חשיפות')){
    iframeWindow.showme();
  }
  
    
 }

function matchTeshuva(transcript){
  if(transcript.includes('שניים')||transcript.includes('שתיים')){
    return 2;alert(2)
  }
  else if(transcript.includes('אחד')||transcript.includes('אחת')){
    return 1;
  }
  else if(transcript.includes('שלוש')){
    return 3;
  }
}
function matchSheala(transcript){
  if(transcript.includes('ראשונה')){
    return 'q1';alert(1)}
    else if(transcript.includes('חמישית')){
    return 'q5'}
     else if(transcript.includes('שישית')){
    return 'q6'}
    else if(transcript.includes('שניה')){
    return 'q2'}
    else if(transcript.includes('שלישית')){
    return 'q3'}
    else if(transcript.includes('רביעית')){
    return 'q4'}
    
    
}

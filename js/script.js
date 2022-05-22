//Скрипты


$(function(){

	//Устанавливаем положения для всех блоков
	function setSizes() {
		minHeight = $(window).height() - $('#footerBlock').outerHeight(true) - $('#fullPage').outerHeight(true) + $('#fullPage').height();
		$('#fullPage').css({
			'min-height': minHeight,
		});

		//Адаптив на главной
		if (($(".open-menu-button").css("display") != "none")){
			var mainHeight = 0;
			$(".main-wrapper").each(function(){
				if ($(this).outerHeight() > mainHeight){
					mainHeight = $(this).outerHeight();
				}
			});
			$(".main-wrapper").css("height",mainHeight);
			var paddingTop = $(".main-wrapper").outerHeight();
			if (paddingTop > minHeight) {
				$(".main-page-block").css("padding-top",paddingTop);
			} else {
				$(".main-page-block").css("padding-top",minHeight);
			}
		} else {
			$(".main-page-block").css("padding-top","");
		}

		//Страница с картой
		var mapHeight = $(window).height() - $("#headerBlock").outerHeight() - $("#footerBlock").outerHeight();
		  if (mapHeight > 600){
		      $("#mapCanvas").css("height",mapHeight);
		  } else {
		      $("#mapCanvas").css("height",600);
		  }
	}


	setSizes();
	$(window).resize(function () {
		setSizes();
	});

	//Добавляем мобильный вариант таблицы
	var codeString = '';
	$(".responsive-table-row").each(function(){
		codeString = codeString + '<div class="mobile-table-block"><div class="mobile-table-header">'+ $(this).find('.responsive-table-td:eq(0)').html() + '</div><div class="mobile-table-wrapper"><div class="mobile-table">';
		$(this).find(".responsive-table-td").each(function(){
			var index = $(this).index();
			
			switch (index){
				case 0 :{
					codeString = codeString + '';
					break;
				}
				default :{
					codeString = codeString + '<div class="mobile-table-row"><div class="mobile-table-td mobile-table-subject">'+ $(this).closest('.responsive-table').find('.responsive-table-header .responsive-table-td:eq(' + index + ')').html() + '</div><div class="mobile-table-td mobile-table-info">' + $(this).html() + '</div></div>';
					break;
				}
			}
			
		});
		codeString = codeString + '</div></div></div>';
	});
	
	$(".responsive-table").after('<div class="mobile-variant-table">' + codeString + '</div>');
	$(".inner-page").find(".mobile-variant-table .info-block").remove();

	//Управление адаптивными таблицами
	$(".inner-page").find(".mobile-table-wrapper").hide();
	$(".inner-page").find(".mobile-table-header").click(function(){
		$(this).closest(".mobile-table-block").find(".mobile-table-wrapper").slideToggle();
		$(this).toggleClass("opened");
	});

	//Открываем блок полностью
	$(".opened-block").each(function(){
		if ($(this).outerHeight() > 250){
			$(this).addClass("min-height");
		} else {
			$(this).find(".more-link-wrap").hide();
		}
	});
	$(".more-link").on("click",function(){
		$(this).closest(".more-link-wrap").hide();
		$(this).closest(".client-block").removeClass("min-height");
		return false;
	});

	//Ссылки партнёров
	$(".partner-link").hover(function(){
		changeLink($(this));
	},function(){
		changeLink($(this));
	});

	function changeLink(emelent){
		var image = emelent.find("img");
		var imageLink = image.attr("src");
		var imageHoverLink = emelent.data("hover");
		image.attr("src",imageHoverLink);
		emelent.data("hover",imageLink);
	}

	//Показываем блок отзыва
	$(".achievements-table-td .info-block").click(function(){
		$(".achievements-table").find(".review-block").hide();
		$(this).find(".review-block").show();
		return false;
	});

	//Скрываем блок отзыва
	$(document.body).click(function(event){
		if ($(event.target).closest('.review-block').length) return;
		$('.review-block').fadeOut();
		event.stopPropagation();
	});

	//Добавим распорки
	$(".employer-block").each(function(i){
		if ((i % 2 == 0) && (i != 0)){
			$(this).before('<div class="clearfix"></div>');
		}
	});

	//Открываем форму заказа звонка
	$("#openRecallForm").click(function(){
		$(this).addClass("opened");
		$("#recallForm").show();
		return false;
	});

	$("#closedForm").click(function(){
		$("#recallForm").fadeOut(400);
		setTimeout(function(){
			$("#openRecallForm").removeClass("opened");
		},400);
		return false;
	});

	//Приклеиваем меню при скролле
	$(window).on("scroll",function(){

        if ( $(this).scrollTop() > 0 ){
            $("#headerBlock").removeClass("default").addClass("fixed-header");
        } else if($(this).scrollTop() <= 0 ) {
            $("#headerBlock").removeClass("fixed-header").addClass("default");
        }
    });//scroll

	$(document.body).click(function(event){
		if ($(event.target).closest('#recallForm, #openRecallForm').length) return;
		$('#recallForm').fadeOut(400);
		setTimeout(function(){
			$("#openRecallForm").removeClass("opened");
		},400);
		event.stopPropagation();
	});

	//Вешаем маску номера
	$(".phonefield").inputmask("8(999)999-99-99");

	//Адаптивное меню
	$("#headerMenuBlock .nav").html("").html($(".standart-nav").html());
	$("#openHeaderMenu").click(function(){
		if ($("#headerMenuBlock").find(".nav").hasClass("open-menu")){
			closeMenu();
		} else {
			openMenu();
		}
		return false;
	});

	$("#closedMenuBlock").click(function(){
		closeMenu();
		return false;
	});

	function openMenu(){
		$("#headerMenuBlock .nav").slideDown(400);
		$("#headerMenuBlock .nav").addClass("open-menu");
		setTimeout(function(){$("#closedMenuBlock").show();},400);
	}
	function closeMenu(){
		$("#headerMenuBlock .nav").slideUp(400);
		$("#headerMenuBlock .nav").removeClass("open-menu");
		$("#closedMenuBlock").hide();
	}

});

$(window).load(function () {
	$(window).trigger("resize");
});
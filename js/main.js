$(function(){
  $("#main > ul:first-child").attr('class','active-section');
  $("#main > ul:not(:first-child)").css("display","none");
  $("#main > ul h1").css("position","fixed");
  $("#menu a:first").attr('id','current');
      
  // control display of nav
  $("#menu a").hover(function(){
    var nthchild = $(this).parents("li").index() + 1;
    var listclass = $(this).parents("menu").attr("class");
    $("#menu li:nth-child("+nthchild+") a").addClass(listclass);    
    $(this).addClass('active');  

  },function(){
    $("#menu a").removeClass();
  });

  // control the function of the nav
  $("#menu a, #main menu a").click(function(event){
    //prevent the default action for the click event
    event.preventDefault();

    // show all the uls so we can have animation from one to another.
    $('#main > ul h1').css("display","none");
    $('#main > ul').css("display","inline-block").removeClass('active-section');

    //split the url by # and get the anchor target
    var anchor = this.href.split("#")[1];
    var target = $(document.getElementById(anchor));

    //get the top and left offset of the target anchor
    var target_offset = target.offset();
    var target_top = (target_offset)?target_offset.top:0;
    var target_left = (target_offset)?target_offset.left:0;

    // set the highlight on the menu item that you are on.
    $("#menu a").removeAttr('id').filter('[href="#'+ anchor +'"]').attr('id','current');

    //goto that anchor by animating the top and left scroll
    $('html, body').animate({
      scrollTop:target_top,
      scrollLeft:target_left
    }, 500, function() {
      // hide the uls that we're not looking at so vertical scrolling works nicely
      $('#main > ul h1').fadeIn('slow');
      target.parent().addClass('active-section').siblings().css("display","none");
    });
  });  

  $(window).scroll(function() {
    var active = $('#main > ul.active-section');
    if (active.length > 0) {
    
      var window_offset = $(window).scrollTop() + 150;
      active_length = active.children('li').length;
      
      for (var i = 1; i <= active_length; i++) {
        if (active_length === i) {
          var anchor = $(active.children('li')[i - 1]).attr('id');
          $("#menu a").removeAttr('id').filter('[href="#'+ anchor +'"]').attr('id','current');
          break;
        } 

        var li = $(active.children('li')[i])
        var li_offset = li.offset().top;
        if (li_offset > window_offset) {
          var anchor = $(active.children('li')[i - 1]).attr('id');
          $("#menu a").removeAttr('id').filter('[href="#'+ anchor +'"]').attr('id','current');
          break;
        }
      }
    }
  });
});
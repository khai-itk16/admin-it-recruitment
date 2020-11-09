import { Component, OnInit } from '@angular/core';

declare var $: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.initFunction()
  }

  initFunction(): void {
    $(window).bind("load resize", function () {
      if ($(this).width() < 768) {
          $('div.sidebar-collapse').addClass('collapse')
      } else {
          $('div.sidebar-collapse').removeClass('collapse')
      }
    });

    $(document).ready(function() {
    
      $('#main-menu').metisMenu();

      $(".dropdown-button").dropdown();

      $("#sideNav").click(function(){
        if($(this).hasClass('closed')){
          $('.navbar-side').animate({left: '0px'});
          $(this).removeClass('closed');
          $('#page-wrapper').animate({'margin-left' : '260px'});
        }
        else{
          $(this).addClass('closed');
          $('.navbar-side').animate({left: '-260px'});
          $('#page-wrapper').animate({'margin-left' : '0px'}); 
        }
      });
    })
  }


}

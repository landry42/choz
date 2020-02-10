jsPanel.extend({
  borderRadius: function (rad) {
      var br = rad+'px';
      var hdr = this.header.style;
      var cont = this.content.style;
      var ftr = this.footer.style;
      // set border-radius of outer div
      this.style.borderRadius = br;
      // set border-radius of either header or content section depending on presence of header
      if (this.querySelector('.jsPanel-hdr')) {
          hdr.borderTopLeftRadius = br;
          hdr.borderTopRightRadius = br;
      } else {
          cont.borderTopLeftRadius = br;
          cont.borderTopRightRadius = br;
      }
      // set border-radius of either footer or content section depending on presence of header
      if (this.querySelector('.jsPanel-ftr.active')) {
          ftr.borderBottomLeftRadius = br;
          ftr.borderBottomRightRadius = br;
      } else {
          cont.borderBottomLeftRadius = br;
          cont.borderBottomRightRadius = br;
      }
      // return the panel
      return this;
  }
});
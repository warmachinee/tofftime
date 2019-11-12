export default function _getWord(lang){

  return {
    form: function(){
      switch (lang) {
        case 'TH':
          return 'รายชื่อผู้สมัคร'
          break;
        default:
          return 'Form'
      }
    }(),
    Hello_World2: function(){
      switch (lang) {
        case 'TH':
          return '22222สองสองอสง'
          break;
        default:
          return '222222222222222'
      }
    }(),
  }
}

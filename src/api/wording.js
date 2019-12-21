export default function _getWord(lang){
  const Declarative = {}
  const Interrogative = {}
  const Imperative = {}

  Declarative['The number of the player who will get a reward.'] = function(){
    switch (lang) {
      case 'TH':
        return 'จำนวนผู้เล่นที่จะได้รางวัล'
        break;
      default:
        return 'The number of the player who will get a reward.'
    }
  }()
  Declarative['No players get the reward.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ไม่มีผู้เล่นได้รับรางวัล'
        break;
      default:
        return 'No players get the reward.'
    }
  }()
  Declarative['Match Rules, Regulations and Detail'] = function(){
    switch (lang) {
      case 'TH':
        return 'กฏ กติกา และ รายละเอียดการแข่งขัน'
        break;
      default:
        return 'Match Rules, Regulations and Detail'
    }
  }()
  Declarative['Add to your group after create.'] = function(){
    switch (lang) {
      case 'TH':
        return 'เพิ่มในกลุ่มของคุณหลังจากสร้าง'
        break;
      default:
        return 'Add to your group after create.'
    }
  }()

  Interrogative['Are you sure you want to Log out?'] = function(){
    switch (lang) {
      case 'TH':
        return 'ต้องการลงชื่อออกหรือไม่ ?'
        break;
      default:
        return 'Are you sure you want to Log out?'
    }
  }()
  Interrogative['Are you sure you want to delete?'] = function(){
    switch (lang) {
      case 'TH':
        return 'ต้องการลบหรือไม่ ?'
        break;
      default:
        return 'Are you sure you want to delete?'
    }
  }()
  Interrogative['No Result? Create one.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ไม่มีผลลัพธ์ ? สร้างผู้เล่นใหม'
        break;
      default:
        return 'No Result? Create one.'
    }
  }()

  Imperative['Please Select Course.'] = function(){
    switch (lang) {
      case 'TH':
        return 'กรุณาเลือกสนาม'
        break;
      default:
        return 'Please Select Course.'
    }
  }()
  Imperative['Please pick one.'] = function(){
    switch (lang) {
      case 'TH':
        return 'กรุณาเลือก'
        break;
      default:
        return 'Please pick one.'
    }
  }()
  Imperative['Search player that you want to invite'] = function(){
    switch (lang) {
      case 'TH':
        return 'ค้นหาผู้เล่นที่คุณต้องการเชิญ'
        break;
      default:
        return 'Search player that you want to invite'
    }
  }()
  Imperative['Fill the form and click confirm'] = function(){
    switch (lang) {
      case 'TH':
        return 'กรอกข้อมูลแล้วกดยืนยัน'
        break;
      default:
        return 'Fill the form and click confirm'
    }
  }()
  Imperative['to create a new player.'] = function(){
    switch (lang) {
      case 'TH':
        return 'เพื่อสร้างผู้เล่นใหม่'
        break;
      default:
        return 'to create a new player.'
    }
  }()
  Imperative['Fill your password'] = function(){
    switch (lang) {
      case 'TH':
        return 'ใส่รหัสผ่านของคุณ'
        break;
      default:
        return 'Fill your password'
    }
  }()
  Imperative['Please input number (HC).'] = function(){
    switch (lang) {
      case 'TH':
        return 'ใส่ตัวเลข (HC)'
        break;
      default:
        return 'Please input number (HC).'
    }
  }()
  Imperative['Please input group name.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ใส่ชื่อประเภท'
        break;
      default:
        return 'Please input group name.'
    }
  }()
  Imperative['Send a request to show this Match on the Toff-time page.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ส่งคำขอเพื่อแสดงการแข่งขันนี้ในหน้า Toff-time'
        break;
      default:
        return 'Send a request to show this Match on the Toff-time page.'
    }
  }()
  Imperative['Send a request to show this Group on the Toff-time page.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ส่งคำขอเพื่อแสดงกลุ่มนี้ในหน้า Toff-time'
        break;
      default:
        return 'Send a request to show this Group on the Toff-time page.'
    }
  }()
  Imperative['Create the match group.'] = function(){
    switch (lang) {
      case 'TH':
        return 'สร้างกลุ่มการแข่งขัน'
        break;
      default:
        return 'Create the match group.'
    }
  }()
  Imperative['Invite players to a match.'] = function(){
    switch (lang) {
      case 'TH':
        return 'เชิญผู้เล่นเข้าการแข่งขัน'
        break;
      default:
        return 'Invite players to a match.'
    }
  }()
  Imperative['Please complete the Setup step.'] = function(){
    switch (lang) {
      case 'TH':
        return 'โปรดทำขั้นตอนการตั้งค่าให้สมบูรณ์'
        break;
      default:
        return 'Please complete the Setup step.'
    }
  }()
  Imperative['Please input number only.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ใส่ตัวเลขเท่านั้น'
        break;
      default:
        return 'Please input number only.'
    }
  }()
  Imperative['Please create reward.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ยังไม่ได้เพิ่มเงินรางวัล'
        break;
      default:
        return 'Please create reward.'
    }
  }()
  Imperative['Please select player in the list.'] = function(){
    switch (lang) {
      case 'TH':
        return 'เลือกผู้เล่นในลิสต์'
        break;
      default:
        return 'Please select player in the list.'
    }
  }()
  Imperative['Please fill Match name.'] = function(){
    switch (lang) {
      case 'TH':
        return 'กรุณาใส่ชื่อการแข่งขัน'
        break;
      default:
        return 'Please fill Match name.'
    }
  }()
  Imperative['Please fill Main group name.'] = function(){
    switch (lang) {
      case 'TH':
        return 'กรุณาใส่ชื่อกลุ่มหลัก'
        break;
      default:
        return 'Please fill Main group name.'
    }
  }()
  Imperative['Click to show the control panel.'] = function(){
    switch (lang) {
      case 'TH':
        return 'คลิกเพื่อแสดงแผงควบคุม'
        break;
      default:
        return 'Click to show the control panel.'
    }
  }()
  Imperative['Search Match or Group'] = function(){
    switch (lang) {
      case 'TH':
        return 'ค้นหาการแข่งขันหรือกลุ่ม'
        break;
      default:
        return 'Search Match or Group'
    }
  }()
  Imperative['Follow the group to get the latest update'] = function(){
    switch (lang) {
      case 'TH':
        return 'ติดตามกลุ่มเพื่อรับการอัปเดตล่าสุด'
        break;
      default:
        return 'Follow the group to get the latest update'
    }
  }()
  Imperative['Please join or create match'] = function(){
    switch (lang) {
      case 'TH':
        return 'โปรดเข้าร่วมหรือสร้างการแข่งขัน'
        break;
      default:
        return 'Please join or create match'
    }
  }()


  const Notifications = {
    Friend_request: function(){
      switch (lang) {
        case 'TH':
          return 'คำขอเป็นเพื่อน'
          break;
        default:
          return 'Friend request'
      }
    }(),
    Joined_match: function(){
      switch (lang) {
        case 'TH':
          return 'เข้าร่วมการแข่งขัน'
          break;
        default:
          return 'Joined match'
      }
    }(),
    You_joined_match: function(){
      switch (lang) {
        case 'TH':
          return 'คุณเข้าร่วมการแข่งขัน'
          break;
        default:
          return 'You joined match'
      }
    }(),

  }
  Notifications['Accepted your friend request'] = function(){
    switch (lang) {
      case 'TH':
        return 'ยอมรับคำขอเป็นเพื่อน'
        break;
      default:
        return 'Accepted your friend request'
    }
  }()
  Notifications['Match join request'] = function(){
    switch (lang) {
      case 'TH':
        return 'ขอเข้าร่วมการแข่งขัน'
        break;
      default:
        return 'Match join request'
    }
  }()
  Notifications['Match invite request'] = function(){
    switch (lang) {
      case 'TH':
        return 'เชิญเข้าร่วมการแข่งขัน'
        break;
      default:
        return 'Match invite request'
    }
  }()

  const Action = {
    Add: function(){
      switch (lang) {
        case 'TH':
          return 'เพิ่ม'
          break;
        default:
          return 'Add'
      }
    }(),
    Add_admin: function(){
      switch (lang) {
        case 'TH':
          return 'เพิ่มแอดมิน'
          break;
        default:
          return 'Add admin'
      }
    }(),
    Add_Friend: function(){
      switch (lang) {
        case 'TH':
          return 'เพิ่มเพื่อน'
          break;
        default:
          return 'Add'
      }
    }(),
    Add_friend: function(){
      switch (lang) {
        case 'TH':
          return 'เพิ่มเพื่อน'
          break;
        default:
          return 'Add friend'
      }
    }(),
    Share: function(){
      switch (lang) {
        case 'TH':
          return 'แชร์'
          break;
        default:
          return 'Share'
      }
    }(),
    Edit: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไข'
          break;
        default:
          return 'Edit'
      }
    }(),
    Edit_Course: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขสนาม'
          break;
        default:
          return 'Edit Course'
      }
    }(),
    Edit_Dummy: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขผู้ใช้ที่ยังไม่ลงทะเบียน'
          break;
        default:
          return 'Edit non-register user'
      }
    }(),
    Edit_Display: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขการแสดง'
          break;
        default:
          return 'Edit Display'
      }
    }(),
    Edit_schedule: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขตารางเวลา'
          break;
        default:
          return 'Edit schedule'
      }
    }(),
    Edit_group: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขกลุ่ม'
          break;
        default:
          return 'Edit group'
      }
    }(),
    Edit_post: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขโพสต์'
          break;
        default:
          return 'Edit post'
      }
    }(),
    Edit_player_group: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขกลุ่มของผู้เล่น'
          break;
        default:
          return 'Edit group'
      }
    }(),
    Join: function(){
      switch (lang) {
        case 'TH':
          return 'เข้าร่วม'
          break;
        default:
          return 'Join'
      }
    }(),
    Sort_by: function(){
      switch (lang) {
        case 'TH':
          return 'จัดเรียงตาม'
          break;
        default:
          return 'Sort by'
      }
    }(),
    Search: function(){
      switch (lang) {
        case 'TH':
          return 'ค้นหา'
          break;
        default:
          return 'Search'
      }
    }(),
    Search_Friend: function(){
      switch (lang) {
        case 'TH':
          return 'ค้นหาเพื่อน'
          break;
        default:
          return 'Search Friend'
      }
    }(),
    Search_player: function(){
      switch (lang) {
        case 'TH':
          return 'ค้นหาผู้เล่น'
          break;
        default:
          return 'Search player'
      }
    }(),
    Unfriend: function(){
      switch (lang) {
        case 'TH':
          return 'ลบเพื่อน'
          break;
        default:
          return 'Unfriend'
      }
    }(),
    Log_out: function(){
      switch (lang) {
        case 'TH':
          return 'ลงชื่อออก'
          break;
        default:
          return 'Log out'
      }
    }(),
    Create: function(){
      switch (lang) {
        case 'TH':
          return 'สร้าง'
          break;
        default:
          return 'Create'
      }
    }(),
    Create_Match: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างการแข่งขัน'
          break;
        default:
          return 'Create Match'
      }
    }(),
    Create_Organizer: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างกลุ่ม'
          break;
        default:
          return 'Create Organizer'
      }
    }(),
    Create_Course: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างสนาม'
          break;
        default:
          return 'Create Course'
      }
    }(),
    Create_user: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างผู้ใช้งาน'
          break;
        default:
          return 'Create user'
      }
    }(),
    Create_New_User: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างผู้เล่นใหม่'
          break;
        default:
          return 'Create New User.'
      }
    }(),
    Create_post: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างโพสต์'
          break;
        default:
          return 'Create post'
      }
    }(),
    Create_reward: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างเงินรางวัล'
          break;
        default:
          return 'Create reward.'
      }
    }(),
    Create_schedule: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างตารางเวลา'
          break;
        default:
          return 'Create schedule'
      }
    }(),
    Create_Dummy: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างผู้ใช้ที่ยังไม่ลงทะเบียน'
          break;
        default:
          return 'Create non-register user'
      }
    }(),
    Create_group: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างกลุ่ม'
          break;
        default:
          return 'Create group'
      }
    }(),
    Create_flight: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างไฟล์ท'
          break;
        default:
          return 'Create flight'
      }
    }(),
    Decline: function(){
      switch (lang) {
        case 'TH':
          return 'ปฏิเสธ'
          break;
        default:
          return 'Decline'
      }
    }(),
    Accept: function(){
      switch (lang) {
        case 'TH':
          return 'ยอมรับ'
          break;
        default:
          return 'Accept'
      }
    }(),
    Reject: function(){
      switch (lang) {
        case 'TH':
          return 'ปฏิเสธ'
          break;
        default:
          return 'Reject'
      }
    }(),
    Cancel: function(){
      switch (lang) {
        case 'TH':
          return 'ยกเลิก'
          break;
        default:
          return 'Cancel'
      }
    }(),
    Delete: function(){
      switch (lang) {
        case 'TH':
          return 'ลบ'
          break;
        default:
          return 'Delete'
      }
    }(),
    Back: function(){
      switch (lang) {
        case 'TH':
          return 'ย้อนกลับ'
          break;
        default:
          return 'Back'
      }
    }(),
    Remove: function(){
      switch (lang) {
        case 'TH':
          return 'ลบ'
          break;
        default:
          return 'Remove'
      }
    }(),
    Done: function(){
      switch (lang) {
        case 'TH':
          return 'เสร็จ'
          break;
        default:
          return 'Done'
      }
    }(),
    Save: function(){
      switch (lang) {
        case 'TH':
          return 'บันทึก'
          break;
        default:
          return 'Save'
      }
    }(),
    Ok: function(){
      switch (lang) {
        case 'TH':
          return 'ตกลง'
          break;
        default:
          return 'Ok'
      }
    }(),
    Invite_players: function(){
      switch (lang) {
        case 'TH':
          return 'เชิญผู้เล่น'
          break;
        default:
          return 'Invite players.'
      }
    }(),
    Collapse: function(){
      switch (lang) {
        case 'TH':
          return 'ย่อทั้งหมด'
          break;
        default:
          return 'Collapse'
      }
    }(),
    More: function(){
      switch (lang) {
        case 'TH':
          return 'แสดง'
          break;
        default:
          return 'More'
      }
    }(),
    Show_all: function(){
      switch (lang) {
        case 'TH':
          return 'แสดงทั้งหมด'
          break;
        default:
          return 'Show all'
      }
    }(),
    Select_Course: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกสนาม'
          break;
        default:
          return 'Select Course'
      }
    }(),
    Reset: function(){
      switch (lang) {
        case 'TH':
          return 'รีเซ็ต'
          break;
        default:
          return 'Reset'
      }
    }(),
    Confirm: function(){
      switch (lang) {
        case 'TH':
          return 'ยืนยัน'
          break;
        default:
          return 'Confirm'
      }
    }(),
    Set_player_display: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขการแสดงผลของผู้เล่น'
          break;
        default:
          return 'Set player display'
      }
    }(),
    Group_admin: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ดูแลกลุ่ม'
          break;
        default:
          return 'Group admin'
      }
    }(),
    Invite: function(){
      switch (lang) {
        case 'TH':
          return 'ชวนผู้เล่น'
          break;
        default:
          return 'Invite'
      }
    }(),
    Clear: function(){
      switch (lang) {
        case 'TH':
          return 'เคลียร์'
          break;
        default:
          return 'Clear'
      }
    }(),
    Update: function(){
      switch (lang) {
        case 'TH':
          return 'อัพเดท'
          break;
        default:
          return 'Update'
      }
    }(),
    Manage_Schedule: function(){
      switch (lang) {
        case 'TH':
          return 'จัดการตารางเวลา'
          break;
        default:
          return 'Manage Schedule'
      }
    }(),
    Switch_Host: function(){
      switch (lang) {
        case 'TH':
          return 'สลับผู้จัด'
          break;
        default:
          return 'Switch Host'
      }
    }(),
    Upload_image: function(){
      switch (lang) {
        case 'TH':
          return 'อัพโหลดรูป'
          break;
        default:
          return 'Upload image'
      }
    }(),
    Delete_group: function(){
      switch (lang) {
        case 'TH':
          return 'ลบกลุ่ม'
          break;
        default:
          return 'Delete group'
      }
    }(),
    Next: function(){
      switch (lang) {
        case 'TH':
          return 'ถัดไป'
          break;
        default:
          return 'Next'
      }
    }(),
    Confirm_password: function(){
      switch (lang) {
        case 'TH':
          return 'ยืนยันรหัสผ่าน่'
          break;
        default:
          return 'Confirm password'
      }
    }(),
    Change_password: function(){
      switch (lang) {
        case 'TH':
          return 'เปลี่ยนรหัสผ่าน'
          break;
        default:
          return 'Change password'
      }
    }(),
    Go_to_home: function(){
      switch (lang) {
        case 'TH':
          return 'กลับไปหน้าแรก'
          break;
        default:
          return 'Go back to the main page'
      }
    }(),
    Go_back: function(){
      switch (lang) {
        case 'TH':
          return 'ย้อนกลับ'
          break;
        default:
          return 'Go back'
      }
    }(),
    Show: function(){
      switch (lang) {
        case 'TH':
          return 'แสดง'
          break;
        default:
          return 'Show'
      }
    }(),

  }
  Action['Go back to match'] = function(){
    switch (lang) {
      case 'TH':
        return 'กลับไปที่การแข่งขัน'
        break;
      default:
        return 'Go back to match'
    }
  }()

  const Status = {
    Incomplete: function(){
      switch (lang) {
        case 'TH':
          return 'ยังไม่อนุมัติ'
          break;
        default:
          return 'Incomplete'
      }
    }(),
    Pending: function(){
      switch (lang) {
        case 'TH':
          return 'รอดำเนินการ'
          break;
        default:
          return 'Pending'
      }
    }(),
    Complete: function(){
      switch (lang) {
        case 'TH':
          return 'สำเร็จ'
          break;
        default:
          return 'Complete'
      }
    }(),
    Finish: function(){
      switch (lang) {
        case 'TH':
          return 'เสร็จสิ้น'
          break;
        default:
          return 'Finish'
      }
    }(),
    End: function(){
      switch (lang) {
        case 'TH':
          return 'จบแล้ว'
          break;
        default:
          return 'End'
      }
    }(),
    None: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มี'
          break;
        default:
          return 'None'
      }
    }(),
    Status: function(){
      switch (lang) {
        case 'TH':
          return 'สถานะ'
          break;
        default:
          return 'Status'
      }
    }(),
    Privacy: function(){
      switch (lang) {
        case 'TH':
          return 'ความเป็นส่วนตัว'
          break;
        default:
          return 'Privacy'
      }
    }(),
    Public: function(){
      switch (lang) {
        case 'TH':
          return 'สาธารณะ'
          break;
        default:
          return 'Public'
      }
    }(),
    Private: function(){
      switch (lang) {
        case 'TH':
          return 'ส่วนตัว'
          break;
        default:
          return 'Private'
      }
    }(),
    Professional: function(){
      switch (lang) {
        case 'TH':
          return 'มืออาชีพ'
          break;
        default:
          return 'Professional'
      }
    }(),
    Amateur: function(){
      switch (lang) {
        case 'TH':
          return 'มือสมัครเล่น'
          break;
        default:
          return 'Amateur'
      }
    }(),
    Charity: function(){
      switch (lang) {
        case 'TH':
          return 'การกุศล'
          break;
        default:
          return 'Charity'
      }
    }(),
    Professional_match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันมืออาชีพ'
          break;
        default:
          return 'Professional match'
      }
    }(),
    Amateur_match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันมือสมัครเล่น'
          break;
        default:
          return 'Amateur match'
      }
    }(),
    Charity_match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันการกุศล'
          break;
        default:
          return 'Charity match'
      }
    }(),
    No_match: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีการแข่งขัน'
          break;
        default:
          return 'No match'
      }
    }(),
    No_group: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีกลุ่ม'
          break;
        default:
          return 'No group'
      }
    }(),
    No_Dummy: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีผู้ใช้ที่ยังไม่ลงทะเบียน'
          break;
        default:
          return 'No non-register user'
      }
    }(),
    No_player: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีผู้เล่น'
          break;
        default:
          return 'No player'
      }
    }(),
    No_course: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีสนาม'
          break;
        default:
          return 'No course'
      }
    }(),
    No_flight: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีไฟล์ท'
          break;
        default:
          return 'No flight'
      }
    }(),
    No_image: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีรูป'
          break;
        default:
          return 'No image'
      }
    }(),
    No_Result: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีผลลัพธ์'
          break;
        default:
          return 'No results'
      }
    }(),
    No_playoff: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีเพลย์ออฟ์'
          break;
        default:
          return 'No playoff'
      }
    }(),
    No_playoff_player: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีผู้เล่นเพลย์ออฟ'
          break;
        default:
          return 'No playoff player'
      }
    }(),
    No_reward: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีเงินรางวัล'
          break;
        default:
          return 'No reward'
      }
    }(),
    No_schedule_yet: function(){
      switch (lang) {
        case 'TH':
          return 'ยังไม่มีตารางเวลา'
          break;
        default:
          return 'No schedule yet'
      }
    }(),
    No_post: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีโพสต์'
          break;
        default:
          return 'No post'
      }
    }(),
    No_data: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีข้อมูล'
          break;
        default:
          return 'No data'
      }
    }(),
    No_match_for: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีหน้าที่่ตรงกับ'
          break;
        default:
          return 'No match for'
      }
    }(),
    No_user: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีผู้ใช้'
          break;
        default:
          return 'No user'
      }
    }(),
    No_notifications: function(){
      switch (lang) {
        case 'TH':
          return 'ไม่มีการแจ้งเตือน'
          break;
        default:
          return 'No notifications'
      }
    }(),
  }
  Status['This match is over'] = function(){
    switch (lang) {
      case 'TH':
        return 'การแข่งขันนี้จบแล้ว'
        break;
      default:
        return 'This match is over'
    }
  }()
  Status['No groups were chosen for the players.'] = function(){
    switch (lang) {
      case 'TH':
        return 'ไม่ได้เลือกกลุ่มให้ผู้เล่น'
        break;
      default:
        return 'No groups were chosen for the players.'
    }
  }()
  Status['Show in Registration player'] = function(){
    switch (lang) {
      case 'TH':
        return 'แสดงในรายชื่อผู้สมัคร'
        break;
      default:
        return 'Show in Registration player'
    }
  }()

  const Name = {
    About_group: function(){
      switch (lang) {
        case 'TH':
          return 'เกี่ยวกับกลุ่ม'
          break;
        default:
          return 'About group'
      }
    }(),
    About: function(){
      switch (lang) {
        case 'TH':
          return 'เกี่ยวกับ'
          break;
        default:
          return 'About'
      }
    }(),
    Detail: function(){
      switch (lang) {
        case 'TH':
          return 'รายละเอียด'
          break;
        default:
          return 'Detail'
      }
    }(),
    Read_more: function(){
      switch (lang) {
        case 'TH':
          return 'อ่านต่อ'
          break;
        default:
          return 'Read more'
      }
    }(),
    Method: function(){
      switch (lang) {
        case 'TH':
          return 'วิธีคํานวณ'
          break;
        default:
          return 'Method'
      }
    }(),
    Set_special_reward: function(){
      switch (lang) {
        case 'TH':
          return 'ตั้งค่ารางวัลพิเศษ'
          break;
        default:
          return 'Set up special reward'
      }
    }(),
    Special_reward: function(){
      switch (lang) {
        case 'TH':
          return 'รางวัลพิเศษ'
          break;
        default:
          return 'Special reward'
      }
    }(),
    Lowgross: function(){
      switch (lang) {
        case 'TH':
          return 'Gross ต่ำสุด'
          break;
        default:
          return 'Low gross'
      }
    }(),
    Lownet: function(){
      switch (lang) {
        case 'TH':
          return 'Net ต่ำสุด'
          break;
        default:
          return 'Low net'
      }
    }(),
    Booby: function(){
      switch (lang) {
        case 'TH':
          return 'บู้บี้'
          break;
        default:
          return 'The last secondary'
      }
    }(),
    Result: function(){
      switch (lang) {
        case 'TH':
          return 'ผลลัพธ์'
          break;
        default:
          return 'Result'
      }
    }(),
    Example: function(){
      switch (lang) {
        case 'TH':
          return 'ตัวอย่าง'
          break;
        default:
          return 'Example'
      }
    }(),
    Main_player: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้เล่นหลัก'
          break;
        default:
          return 'Main player'
      }
    }(),
    Hole: function(){
      switch (lang) {
        case 'TH':
          return 'หลุม'
          break;
        default:
          return 'Hole'
      }
    }(),
    Minimum_price: function(){
      switch (lang) {
        case 'TH':
          return 'ราคาขั้นต่ำ'
          break;
        default:
          return 'Minimum price'
      }
    }(),
    Control_panel: function(){
      switch (lang) {
        case 'TH':
          return 'แผงควบคุม'
          break;
        default:
          return 'Control panel'
      }
    }(),
    Limitation_player: function(){
      switch (lang) {
        case 'TH':
          return 'การจำกัด ( จำนวนผู้เล่น )'
          break;
        default:
          return 'Limitation ( number of player )'
      }
    }(),
    Setting: function(){
      switch (lang) {
        case 'TH':
          return 'การตั้งค่า'
          break;
        default:
          return 'Setting'
      }
    }(),
    Scoreboard: function(){
      switch (lang) {
        case 'TH':
          return 'ตารางคะแนน'
          break;
        default:
          return 'Scoreboard'
      }
    }(),
    Form: function(){
      switch (lang) {
        case 'TH':
          return 'รายชื่อผู้สมัคร'
          break;
        default:
          return 'Registration player'
      }
    }(),
    Registration: function(){
      switch (lang) {
        case 'TH':
          return 'รายชื่อผู้สมัคร'
          break;
        default:
          return 'Registration'
      }
    }(),
    Schedule: function(){
      switch (lang) {
        case 'TH':
          return 'ตารางการแข่งขัน'
          break;
        default:
          return 'Schedule'
      }
    }(),
    Mini_Game: function(){
      switch (lang) {
        case 'TH':
          return 'มินิเกม'
          break;
        default:
          return 'Mini Game'
      }
    }(),
    Full_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อ-นามสกุล'
          break;
        default:
          return 'Full name'
      }
    }(),
    First_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อ'
          break;
        default:
          return 'First name'
      }
    }(),
    Last_name: function(){
      switch (lang) {
        case 'TH':
          return 'นามสกุล'
          break;
        default:
          return 'Last name'
      }
    }(),
    Player_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อผู้เล่น'
          break;
        default:
          return 'Player name'
      }
    }(),
    Team: function(){
      switch (lang) {
        case 'TH':
          return 'ทีม'
          break;
        default:
          return 'Team'
      }
    }(),
    Time: function(){
      switch (lang) {
        case 'TH':
          return 'เวลา'
          break;
        default:
          return 'Time'
      }
    }(),
    Note: function(){
      switch (lang) {
        case 'TH':
          return 'หมายเหตุ'
          break;
        default:
          return 'Note'
      }
    }(),
    Other: function(){
      switch (lang) {
        case 'TH':
          return 'อื่นๆ'
          break;
        default:
          return 'Other'
      }
    }(),
    Rank: function(){
      switch (lang) {
        case 'TH':
          return 'อันดับ'
          break;
        default:
          return 'Rank'
      }
    }(),
    PAR_Score: function(){
      switch (lang) {
        case 'TH':
          return 'คะแนนสนาม'
          break;
        default:
          return 'PAR Score'
      }
    }(),
    Group: function(){
      switch (lang) {
        case 'TH':
          return 'ประเภท'
          break;
        default:
          return 'Group'
      }
    }(),
    Reward: function(){
      switch (lang) {
        case 'TH':
          return 'รางวัล'
          break;
        default:
          return 'Reward'
      }
    }(),
    Prize: function(){
      switch (lang) {
        case 'TH':
          return 'เงินรางวัล'
          break;
        default:
          return 'Prize'
      }
    }(),
    Sign: function(){
      switch (lang) {
        case 'TH':
          return 'ลายเซ็น'
          break;
        default:
          return 'Sign'
      }
    }(),
    Match_list: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขัน'
          break;
        default:
          return 'Match list'
      }
    }(),
    Post: function(){
      switch (lang) {
        case 'TH':
          return 'โพสต์'
          break;
        default:
          return 'Post'
      }
    }(),
    Content: function(){
      switch (lang) {
        case 'TH':
          return 'เนื้อหา'
          break;
        default:
          return 'Content'
      }
    }(),
    Date: function(){
      switch (lang) {
        case 'TH':
          return 'วันที่'
          break;
        default:
          return 'Date'
      }
    }(),
    Friend: function(){
      switch (lang) {
        case 'TH':
          return 'เพื่อน'
          break;
        default:
          return 'Friend'
      }
    }(),
    Match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขัน'
          break;
        default:
          return 'Match'
      }
    }(),
    News: function(){
      switch (lang) {
        case 'TH':
          return 'ข่าว'
          break;
        default:
          return 'News'
      }
    }(),
    Organizer: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้จัดการแข่งขัน'
          break;
        default:
          return 'Organizer'
      }
    }(),
    Notifications: function(){
      switch (lang) {
        case 'TH':
          return 'การแจ้งเตือน'
          break;
        default:
          return 'Notifications'
      }
    }(),
    Dashboard: function(){
      switch (lang) {
        case 'TH':
          return 'หน้าหลัก'
          break;
        default:
          return 'Dashboard'
      }
    }(),
    Management: function(){
      switch (lang) {
        case 'TH':
          return 'ระบบการจัดการ'
          break;
        default:
          return 'Management'
      }
    }(),
    Match_Management: function(){
      switch (lang) {
        case 'TH':
          return 'การจัดการการแข่งขัน'
          break;
        default:
          return 'Match Management'
      }
    }(),
    Course_Management: function(){
      switch (lang) {
        case 'TH':
          return 'การจัดการสนาม'
          break;
        default:
          return 'Course Management'
      }
    }(),
    Course: function(){
      switch (lang) {
        case 'TH':
          return 'สนาม'
          break;
        default:
          return 'Course'
      }
    }(),
    Post_Management: function(){
      switch (lang) {
        case 'TH':
          return 'การจัดโพสต์'
          break;
        default:
          return 'Post Management'
      }
    }(),
    Upcoming: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันเร็วๆนี้'
          break;
        default:
          return 'Upcoming match'
      }
    }(),
    History: function(){
      switch (lang) {
        case 'TH':
          return 'ประวัติ'
          break;
        default:
          return 'History'
      }
    }(),
    User: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ใช้งาน'
          break;
        default:
          return 'User'
      }
    }(),
    Handicap: function(){
      switch (lang) {
        case 'TH':
          return 'แฮนดิแคป'
          break;
        default:
          return 'Handicap'
      }
    }(),
    Official: function(){
      switch (lang) {
        case 'TH':
          return 'เป็นทางการ'
          break;
        default:
          return 'Official'
      }
    }(),
    version: function(){
      switch (lang) {
        case 'TH':
          return 'เวอร์ชัน'
          break;
        default:
          return 'version'
      }
    }(),
    Version_up: function(){
      switch (lang) {
        case 'TH':
          return 'เวอร์ชัน'
          break;
        default:
          return 'Version'
      }
    }(),
    Course_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อสนาม'
          break;
        default:
          return 'Course name'
      }
    }(),
    Dummy: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ใช้ที่ยังไม่ลงทะเบียน'
          break;
        default:
          return 'Non-register user'
      }
    }(),
    Match_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อการแข่งขัน'
          break;
        default:
          return 'Match name'
      }
    }(),
    Match_Date: function(){
      switch (lang) {
        case 'TH':
          return 'วันที่แข่ง'
          break;
        default:
          return 'Match Date'
      }
    }(),
    Display: function(){
      switch (lang) {
        case 'TH':
          return 'การแสดงผล'
          break;
        default:
          return 'Display'
      }
    }(),
    Type: function(){
      switch (lang) {
        case 'TH':
          return 'ประเภท'
          break;
        default:
          return 'Type'
      }
    }(),
    My_match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันของฉัน'
          break;
        default:
          return 'My match'
      }
    }(),
    Admin: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ดูแล'
          break;
        default:
          return 'Admin'
      }
    }(),
    View: function(){
      switch (lang) {
        case 'TH':
          return 'การดู'
          break;
        default:
          return 'View'
      }
    }(),
    Password: function(){
      switch (lang) {
        case 'TH':
          return 'รหัสผ่าน'
          break;
        default:
          return 'Password'
      }
    }(),
    Invitation: function(){
      switch (lang) {
        case 'TH':
          return 'การเชิญ'
          break;
        default:
          return 'Invitation'
      }
    }(),
    Group_M: function(){
      switch (lang) {
        case 'TH':
          return 'จัดการกลุ่ม'
          break;
        default:
          return 'Group'
      }
    }(),
    Schedule_M: function(){
      switch (lang) {
        case 'TH':
          return 'ตารางเวลา'
          break;
        default:
          return 'Schedule'
      }
    }(),
    Manage_Player: function(){
      switch (lang) {
        case 'TH':
          return 'จัดการผู้เล่น'
          break;
        default:
          return 'Manage Player'
      }
    }(),
    Player_management: function(){
      switch (lang) {
        case 'TH':
          return 'ระบบจัดการผู้เล่น'
          break;
        default:
          return 'Player management'
      }
    }(),
    Scorecard: function(){
      switch (lang) {
        case 'TH':
          return 'คะแนนสนาม'
          break;
        default:
          return 'Scorecard'
      }
    }(),
    Scorecard_M: function(){
      switch (lang) {
        case 'TH':
          return 'จัดการคะแนน'
          break;
        default:
          return 'Scorecard'
      }
    }(),
    Player_Scorecard: function(){
      switch (lang) {
        case 'TH':
          return 'จัดการคะแนน'
          break;
        default:
          return 'Player Scorecard'
      }
    }(),
    Scorecard_MBSE: function(){
      switch (lang) {
        case 'TH':
          return 'กรอกคะแนนผู้เล่น'
          break;
        default:
          return 'Scorecard'
      }
    }(),
    Playoff: function(){
      switch (lang) {
        case 'TH':
          return 'เพลย์ออฟ'
          break;
        default:
          return 'Playoff'
      }
    }(),
    Admin_M: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ดูแลการแข่งขัน'
          break;
        default:
          return 'Admin'
      }
    }(),
    Detail_M: function(){
      switch (lang) {
        case 'TH':
          return 'แก้ไขรายละเอียด'
          break;
        default:
          return 'Detail'
      }
    }(),
    Request: function(){
      switch (lang) {
        case 'TH':
          return 'ส่งคำร้อง'
          break;
        default:
          return 'Request'
      }
    }(),
    Request_mainpage_BTN: function(){
      switch (lang) {
        case 'TH':
          return 'หน้า Toff-time'
          break;
        default:
          return 'Toff-time Page'
      }
    }(),
    Main_menu: function(){
      switch (lang) {
        case 'TH':
          return 'เมนูหลัก'
          break;
        default:
          return 'Main menu'
      }
    }(),
    Match_Setup: function(){
      switch (lang) {
        case 'TH':
          return 'การตั้งค่าการแข่งขัน'
          break;
        default:
          return 'Match Setup'
      }
    }(),
    Period_T: function(){
      switch (lang) {
        case 'TH':
          return 'ระยะห่างเวลาต่อทีม'
          break;
        default:
          return 'Period'
      }
    }(),
    minute: function(){
      switch (lang) {
        case 'TH':
          return 'นาที'
          break;
        default:
          return 'minute'
      }
    }(),
    Type_of_amount: function(){
      switch (lang) {
        case 'TH':
          return 'ประเภทของจำนวน'
          break;
        default:
          return 'Type of amount'
      }
    }(),
    Person: function(){
      switch (lang) {
        case 'TH':
          return 'บุคคล'
          break;
        default:
          return 'Person'
      }
    }(),
    Auto_generate: function(){
      switch (lang) {
        case 'TH':
          return 'สร้างอัตโนมัติ'
          break;
        default:
          return 'Auto-generate'
      }
    }(),
    Flight: function(){
      switch (lang) {
        case 'TH':
          return 'ไฟล์ท'
          break;
        default:
          return 'Flight'
      }
    }(),
    Main_group: function(){
      switch (lang) {
        case 'TH':
          return 'กลุ่มหลัก'
          break;
        default:
          return 'Main group'
      }
    }(),
    Main_group_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อกลุ่มหลัก'
          break;
        default:
          return 'Main group name'
      }
    }(),
    Main_group_type: function(){
      switch (lang) {
        case 'TH':
          return 'ประเภทของกลุ่มหลัก'
          break;
        default:
          return 'Main group type'
      }
    }(),
    Role: function(){
      switch (lang) {
        case 'TH':
          return 'ตำแหน่ง'
          break;
        default:
          return 'Role'
      }
    }(),
    Host: function(){
      switch (lang) {
        case 'TH':
          return 'เจ้าของการแข่งขัน'
          break;
        default:
          return 'Host'
      }
    }(),
    Member: function(){
      switch (lang) {
        case 'TH':
          return 'สมาชิก'
          break;
        default:
          return 'Member'
      }
    }(),
    Showing: function(){
      switch (lang) {
        case 'TH':
          return 'การแสดงผล'
          break;
        default:
          return 'Showing'
      }
    }(),
    Selected_Group: function(){
      switch (lang) {
        case 'TH':
          return 'ประเภทที่เลือก'
          break;
        default:
          return 'Selected Group'
      }
    }(),
    Select_Group: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกประเภท'
          break;
        default:
          return 'Select Group'
      }
    }(),
    Selected_Team: function(){
      switch (lang) {
        case 'TH':
          return 'ทีมที่เลือก'
          break;
        default:
          return 'Selected Team'
      }
    }(),
    Select_Team: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกทีม'
          break;
        default:
          return 'Select Team'
      }
    }(),
    Selected_Time: function(){
      switch (lang) {
        case 'TH':
          return 'เวลาที่เลือก'
          break;
        default:
          return 'Selected Time'
      }
    }(),
    Select_Time: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกเวลา'
          break;
        default:
          return 'Select Time'
      }
    }(),
    Select_Player: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกผู้เล่น'
          break;
        default:
          return 'Select Player'
      }
    }(),
    Select_match: function(){
      switch (lang) {
        case 'TH':
          return 'เลือกการแข่งขัน'
          break;
        default:
          return 'Select match'
      }
    }(),
    Selected_match: function(){
      switch (lang) {
        case 'TH':
          return 'การแข่งขันที่เลือก'
          break;
        default:
          return 'Selected match'
      }
    }(),
    Number: function(){
      switch (lang) {
        case 'TH':
          return 'ตัวเลข'
          break;
        default:
          return 'Number'
      }
    }(),
    Personal_display: function(){
      switch (lang) {
        case 'TH':
          return 'คะแนนรายคน'
          break;
        default:
          return 'Personal display'
      }
    }(),
    Predict_Score: function(){
      switch (lang) {
        case 'TH':
          return 'คะแนนที่ทาย'
          break;
        default:
          return 'Predict Score'
      }
    }(),
    Group_name: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อกลุ่ม'
          break;
        default:
          return 'Group name'
      }
    }(),
    Nickname: function(){
      switch (lang) {
        case 'TH':
          return 'ชื่อเล่น'
          break;
        default:
          return 'Nickname'
      }
    }(),
    email: function(){
      switch (lang) {
        case 'TH':
          return 'อีเมล'
          break;
        default:
          return 'email'
      }
    }(),
    Gender: function(){
      switch (lang) {
        case 'TH':
          return 'เพศ'
          break;
        default:
          return 'Gender'
      }
    }(),
    Male: function(){
      switch (lang) {
        case 'TH':
          return 'ชาย'
          break;
        default:
          return 'Male'
      }
    }(),
    Female: function(){
      switch (lang) {
        case 'TH':
          return 'หญิง'
          break;
        default:
          return 'Female'
      }
    }(),
    Phone_number: function(){
      switch (lang) {
        case 'TH':
          return 'เบอร์โทรศัพท์'
          break;
        default:
          return 'Phone number'
      }
    }(),
    Birthday: function(){
      switch (lang) {
        case 'TH':
          return 'วันเกิด'
          break;
        default:
          return 'Birthday'
      }
    }(),
    Age: function(){
      switch (lang) {
        case 'TH':
          return 'อายุ'
          break;
        default:
          return 'Age'
      }
    }(),
    Golf_favorite_equipment: function(){
      switch (lang) {
        case 'TH':
          return 'อุปกรณ์ที่ชอบใช้'
          break;
        default:
          return 'Golf favorite equipment'
      }
    }(),
    Equipment: function(){
      switch (lang) {
        case 'TH':
          return 'อุปกรณ์ที่ใช้'
          break;
        default:
          return 'Equipment'
      }
    }(),
    Old_password: function(){
      switch (lang) {
        case 'TH':
          return 'รหัสผ่านเก่า'
          break;
        default:
          return 'Old password'
      }
    }(),
    New_password: function(){
      switch (lang) {
        case 'TH':
          return 'รหัสผ่านใหม่'
          break;
        default:
          return 'New password'
      }
    }(),
    Group_post: function(){
      switch (lang) {
        case 'TH':
          return 'โพสต์ของกลุ่ม'
          break;
        default:
          return 'Group\'s post'
      }
    }(),
    Profile: function(){
      switch (lang) {
        case 'TH':
          return 'โปรไฟล์'
          break;
        default:
          return 'Profile'
      }
    }(),
    Login: function(){
      switch (lang) {
        case 'TH':
          return 'เข้าสู่ระบบ'
          break;
        default:
          return 'Login'
      }
    }(),
    Home: function(){
      switch (lang) {
        case 'TH':
          return 'หน้าแรก'
          break;
        default:
          return 'Home'
      }
    }(),
    Title: function(){
      switch (lang) {
        case 'TH':
          return 'หัวข้อ'
          break;
        default:
          return 'Title'
      }
    }(),
    Announce: function(){
      switch (lang) {
        case 'TH':
          return 'ประกาศ'
          break;
        default:
          return 'Announce'
      }
    }(),

  }

  const Follow = {
    Follow_BTN: function(){
      switch (lang) {
        case 'TH':
          return 'ติดตาม'
          break;
        default:
          return 'Follow'
      }
    }(),
    Follow: function(){
      switch (lang) {
        case 'TH':
          return 'การติดตาม'
          break;
        default:
          return 'Follow'
      }
    }(),
    follower: function(){
      switch (lang) {
        case 'TH':
          return 'ผู้ติดตาม'
          break;
        default:
          return 'follower'
      }
    }(),
    Following: function(){
      switch (lang) {
        case 'TH':
          return 'กำลังติดตาม'
          break;
        default:
          return 'Following'
      }
    }(),

  }

  const Other = {
    at: function(){
      switch (lang) {
        case 'TH':
          return 'ณ สนาม'
          break;
        default:
          return 'at'
      }
    }(),
    s: function(){
      switch (lang) {
        case 'TH':
          return ''
          break;
        default:
          return 's'
      }
    }(),
    to: function(){
      switch (lang) {
        case 'TH':
          return 'ถึง'
          break;
        default:
          return 'to'
      }
    }(),

  }

  return {
    ...Declarative,
    ...Interrogative,
    ...Imperative,
    ...Notifications,
    ...Action,
    ...Status,
    ...Name,
    ...Follow,
    ...Other,
  }
}

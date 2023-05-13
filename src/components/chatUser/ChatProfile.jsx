import React, {useState} from 'react'
import WidgetWrapper from '../users/styledComponents/WidgetWrapper';
import UserAvatar from '../users/styledComponents/UserAvatar';
import FlexBetween from '../users/styledComponents/FlexBetween';
import { Box, Typography, Divider, useTheme } from "@mui/material";
import { friend1 } from '../../assets';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import HardwareIcon from '@mui/icons-material/Hardware';
import AdjustIcon from '@mui/icons-material/Adjust';
import RecommendIcon from '@mui/icons-material/Recommend';
import FaceRetouchingNaturalIcon from '@mui/icons-material/FaceRetouchingNatural';
import SavedSearchIcon from '@mui/icons-material/SavedSearch';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FilterIcon from '@mui/icons-material/Filter';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import SpeakerNotesOffIcon from '@mui/icons-material/SpeakerNotesOff';
import BlockIcon from '@mui/icons-material/Block';
import ReportIcon from '@mui/icons-material/Report';

function ChatProfile() {

  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);

  const handleClick1 = () => {
    setOpen1(!open1);
  };

  const handleClick2 = () => {
    setOpen2(!open2);
  };

  const handleClick3 = () => {
    setOpen3(!open3);
  };

  const handleClick4 = () => {
    setOpen4(!open4);
  };
  return (
    <WidgetWrapper className= 'h-full w-full flex flex-col gap-1' style={{height: "90vh",overflowY: "auto"}}>
        <Box display='flex' gap="0.5rem" pb="0.1rem" justifyContent="center" alignItems="center"   
        style={{
            backgroundImage: `url(${friend1})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        
        >
            <Box display='flex' paddingY='50px' style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                <UserAvatar image='https://res.cloudinary.com/dllwgzvxm/image/upload/v1680174020/blank-profile-picture-973460__340_vurt3r.webp' size='50px' alignItems='center' />
                <Box className=''>
                <h2 style={{textAlign: 'center', fontSize: '28px', fontWeight:'800', color: 'white'}}>Bui Tai Linh</h2>
                </Box>
            </Box>
        </Box>
        <Box display='flex' gap="0.5rem" pb="0.1rem" justifyContent="center" alignItems="center">
          <FlexBetween gap="1.5rem">
            <Box display='flex' paddingY='20px' style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                <Box style={{ border: '5px solid #a7dbf1', backgroundColor: '#a7dbf1', borderRadius: '50%'}}>
                <PersonOutlineIcon style={{}} />
                </Box>
                <Box className=''>
                <h2 style={{textAlign: 'center', color: 'black'}}>Personal page</h2>
                </Box>
            </Box>
            <Box display='flex' paddingY='20px' style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                <Box style={{ border: '5px solid #a7dbf1', backgroundColor: '#a7dbf1', borderRadius: '50%'}}>
                <NotificationsIcon style={{}} />
                </Box>
                <Box className=''>
                <h2 style={{textAlign: 'center', color: 'black'}}>Notification</h2>
                </Box>
            </Box>
            <Box display='flex' paddingY='20px' style={{ flexDirection: 'column', alignItems:'center', justifyContent:'center'}}>
                <Box style={{ border: '5px solid #a7dbf1', backgroundColor: '#a7dbf1', borderRadius: '50%'}}>
                <SearchIcon style={{}} />
                </Box>
                <Box className=''>
                <h2 style={{textAlign: 'center', color: 'black'}}>Search</h2>
                </Box>
            </Box>
          </FlexBetween>
        </Box>
        <Box>
        <ListItemButton onClick={handleClick1}>
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="Thông tin đoạn chat" />
        {open1 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open1} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HardwareIcon />
            </ListItemIcon>
            <ListItemText primary="Xem tin nhắn đã ghim" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick2}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Tuy chỉnh đoạn chat" />
        {open2 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open2} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AdjustIcon />
            </ListItemIcon>
            <ListItemText primary="Đổi chủ đề" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <RecommendIcon />
            </ListItemIcon>
            <ListItemText primary="Thay đổi biểu tượng cảm xúc" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FaceRetouchingNaturalIcon />
            </ListItemIcon>
            <ListItemText primary="Chỉnh sửa biệt danh" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SavedSearchIcon />
            </ListItemIcon>
            <ListItemText primary="Tìm kiếm trong trò chuyện" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick3}>
        <ListItemIcon>
          <FolderSpecialIcon />
        </ListItemIcon>
        <ListItemText primary="File phương tiện, file và liên kết" />
        {open3 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open3} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <FilterIcon />
            </ListItemIcon>
            <ListItemText primary="File phương tiện" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AttachFileIcon />
            </ListItemIcon>
            <ListItemText primary="File" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <InsertLinkIcon />
            </ListItemIcon>
            <ListItemText primary="Liên kết" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={handleClick4}>
        <ListItemIcon>
          <PrivacyTipIcon />
        </ListItemIcon>
        <ListItemText primary="Quyền riêng tư & hỗ trợ" />
        {open4 ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open4} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <NotificationsOffIcon />
            </ListItemIcon>
            <ListItemText primary="Tắt tin nhắn" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <SpeakerNotesOffIcon />
            </ListItemIcon>
            <ListItemText primary="Bỏ qua tin nhắn" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <BlockIcon />
            </ListItemIcon>
            <ListItemText primary="Chặn" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ReportIcon />
            </ListItemIcon>
            <ListItemText primary="Báo cáo" />
          </ListItemButton>
        </List>
      </Collapse>
        </Box>
    </WidgetWrapper>
  )
}

export default ChatProfile
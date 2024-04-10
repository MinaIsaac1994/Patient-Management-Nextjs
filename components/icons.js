import Edit from "@mui/icons-material/EditRounded";
import Opel from "@mui/icons-material/ReceiptLong";
import Badge from "@mui/icons-material/BadgeRounded";
import Delete from "@mui/icons-material/DeleteRounded";
import Patient from "@mui/icons-material/HotelRounded";
import Add from "@mui/icons-material/AddCircleRounded";
import Band from "@mui/icons-material/ExtensionRounded";
import Number from "@mui/icons-material/NumbersRounded";
import Explorer from "@mui/icons-material/ExploreRounded";
import Contacts from "@mui/icons-material/BackHandRounded";
import Wait from "@mui/icons-material/HourglassTopRounded";
import Unavailable from "@mui/icons-material/EventBusyRounded";
import Description from "@mui/icons-material/TextSnippetRounded";
import Speciality from "@mui/icons-material/LocalHospitalRounded";
import Name from "@mui/icons-material/DriveFileRenameOutlineRounded";
import PendingReferral from "@mui/icons-material/ScheduleSendRounded";
import TeamLead from "@mui/icons-material/PermContactCalendarRounded";
const icons = {
  Add: (props) => <Add {...props} />,
  Wait: (props) => <Wait {...props} />,
  Name: (props) => <Name {...props} />,
  Opel: (props) => <Opel {...props} />,
  Edit: (props) => <Edit {...props} />,
  Band: (props) => <Band {...props} />,
  Badge: (props) => <Badge {...props} />,
  Number: (props) => <Number {...props} />,
  Explorer: (props) => <Explorer {...props} />,
  Patient: (props) => <Patient {...props} />,
  Contacts: (props) => <Contacts {...props} />,
  TeamLead: (props) => <TeamLead {...props} />,
  Speciality: (props) => <Speciality {...props} />,
  Unavailable: (props) => <Unavailable {...props} />,
  Description: (props) => <Description {...props} />,
  Delete: (props) => <Delete color="error" {...props} />,
  PendingReferral: (props) => <PendingReferral {...props} />,
  PendingReferral: (props) => <PendingReferral {...props} />,
};

export default icons;

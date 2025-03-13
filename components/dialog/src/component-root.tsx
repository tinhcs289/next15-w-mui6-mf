import StyledDialog from "./components/StyledDialog";
import StyledDialogActions from "./components/StyledDialogActions";
import StyledDialogContent from "./components/StyledDialogContent";
import StyledDialogTitle from "./components/StyledDialogTitle";
import StyledDialogTitleText from "./components/StyledDialogTitleText";
import ButtonClose from "./components/ButtonClose";
import {
  DialogStatesProvider,
  DialogLoadingInitializer,
  DialogOnCloseInitializer,
  DialogOpenInitializer,
} from "./context";

const Dialog = {
  StatesProvider: DialogStatesProvider,
  Open: DialogOpenInitializer,
  Loading: DialogLoadingInitializer,
  OnClose: DialogOnCloseInitializer,
  Container: StyledDialog,
  Title: StyledDialogTitle,
  TitleText: StyledDialogTitleText,
  Content: StyledDialogContent,
  Actions: StyledDialogActions,
  CloseButton: ButtonClose,
};

export default Dialog;

// const Demo = () => {
//   return (
//     <Dialog.StatesProvider>
//       <Dialog.Open state={true} />
//       <Dialog.Loading state={true} />
//       <Dialog.OnClose />
//       <Dialog.Container>
//         <Dialog.Title>
//           <Dialog.TitleText></Dialog.TitleText>
//           <Dialog.CloseButton />
//         </Dialog.Title>
//         <Dialog.Content></Dialog.Content>
//         <Dialog.Actions></Dialog.Actions>
//       </Dialog.Container>
//     </Dialog.StatesProvider>
//   );
// };

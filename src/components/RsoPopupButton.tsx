import {Button} from "@mui/material";
import {getRsoLink} from "../types/valapi/valapiurl.ts";

interface Props {
  /**
   * Extra function that will be called before opening the popup
   */
  func?: () => void,
  text?: string,
}

function RsoPopupButton({func, text}: Props) {
  return (
    <Button onClick={() => {
      if (func) func()
      window.open(
        getRsoLink(),
        'RiotSignOn',
        'width=960,height=480'
      )
    }}>
      {text ?? 'Login with Riot'}
    </Button>
  );
}

export default RsoPopupButton;
import { App, Astal, Gtk } from "astal/gtk3";
import { Variable, bind } from "astal";
import Network from "gi://AstalNetwork";

const time = Variable("").poll(1000, "date");

function Wifi(): JSX.Element {
  const network = Network.get_default();
  const wifi = bind(network, "wifi");

  return (
    <box visible={wifi.as(Boolean)}>
      {wifi.as(
        (wifi) =>
          wifi && (
            <icon
              tooltipText={bind(wifi, "ssid").as(String)}
              className="Wifi"
              icon={bind(wifi, "iconName")}
            />
          ),
      )}
    </box>
  );
}

export default function Bar(monitor: number) {
  const { TOP, LEFT, RIGHT } = Astal.WindowAnchor;

  return (
    <window
      className="Bar"
      monitor={monitor}
      exclusivity={Astal.Exclusivity.EXCLUSIVE}
      anchor={TOP | LEFT | RIGHT}
      application={App}
    >
      <centerbox>
        <button onClicked="echo hello" halign={Gtk.Align.CENTER}>
          Welcome to AGS!
        </button>
        <eventbox>
          <Wifi />
        </eventbox>
        <button onClicked={() => print("hello")} halign={Gtk.Align.CENTER}>
          <label label={time()} />
        </button>
      </centerbox>
    </window>
  );
}

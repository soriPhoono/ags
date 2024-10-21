{ inputs, pkgs, ... }: {
  imports = [
    inputs.ags.homeManagerModules.default
  ];

  home.packages = with pkgs; [
    sass
    esbuild

    networkmanagerapplet
    blueberry
    pavucontrol
  ];

  programs.ags = {
    enable = true;
    package = pkgs.ags.overrideAttrs (old: { buildInputs = old.buildInputs ++ [ pkgs.libdbusmenu-gtk3 ]; });

    configDir = ./ags;
  };
}

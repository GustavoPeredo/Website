{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [ 
      nodejs
      yarn
      pandoc
      parallel
      gnused
      entr
    ];
}

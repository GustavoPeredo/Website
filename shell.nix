{ pkgs ? import <nixpkgs> {} }:
  pkgs.mkShell {
    nativeBuildInputs = with pkgs; [ 
      nodejs
      pandoc
      parallel
      gnused
      entr
    ];
}

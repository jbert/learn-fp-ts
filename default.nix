{ pkgs ? import <nixpkgs> {}}:

pkgs.mkShell {
  packages = [ pkgs.typescript pkgs.nodePackages.ts-node pkgs.nodePackages.pnpm pkgs.nodePackages.prettier pkgs.jq ];
}

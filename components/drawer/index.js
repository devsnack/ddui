import React, { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import Link from "next/link";

export default function Drawer() {
  const [visible, setVisible] = useState(false);
  let items = [
    {
      label: "Ajouter Boutique",
      icon: "pi pi-fw pi-user-plus",
      link: "/store/add",
    },
    {
      label: "Prospections",
      icon: "pi pi-fw pi-comments",
      link: "/store/visite",
    },
    { label: "Commande", icon: "pi pi-fw pi-box", link: "/store/sell" },
    { label: "Dashboard", icon: "pi pi-chart-bar", link: "/store/dash" },
  ];
  return (
    <div className="card flex justify-content-center mb-5">
      <Sidebar visible={visible} onHide={() => setVisible(false)} fullScreen>
        <h2>Cartana Com</h2>
        <div className="card border-0">
          {items.map((m) => (
            <button className="btn btn-secondary rounded-0 mb-3">
              <Link
                href={m.link}
                onClick={() => setVisible(false)}
                style={{ color: "white", textDecoration: "none" }}
              >
                <i className={m.icon}></i>
                <span>{m.label}</span>
              </Link>
            </button>
          ))}
        </div>
      </Sidebar>
      <Button icon="pi pi-th-large" onClick={() => setVisible(true)} />
    </div>
  );
}

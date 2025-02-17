"use client"
import React from 'react';
import { Button } from '@/components/ui/button';// Import shadcn components
import { Home, Settings, User, LogOut } from 'lucide-react';
import Link from "next/link";


export default function SideNavigation(){
    return (
        <div className="">
                <div className="h-screen w-1/2 bg-gray-800 text-white flex flex-col">
      {/* <div className="p-6 text-2xl font-bold">
        My App
      </div> */}
      <nav className="flex-1">
        <ul className="space-y-2">
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Home className="mr-2 h-4 w-4" /> 
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <User className="mr-2 h-4 w-4" /> 
            </Button>
          </li>
          <li>
            <Button variant="ghost" className="w-full justify-start">
              <Settings className="mr-2 h-4 w-4" /> 
            </Button>
          </li>
        </ul>
      </nav>
      <div className="p-4">
        <Button variant="ghost" className="w-full justify-start">
          <LogOut className="mr-2 h-4 w-4" />
        </Button>
      </div>
    </div>
        </div>
    )
}
"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Badge } from '../ui/badge'
import { FileText, Clock, User, AlertTriangle, Shield, Eye } from 'lucide-react'
import IncidentReportForm from './incidentReportForm'

export default function reportCard() {
  const [showReportForm, setShowReportForm] = useState(false)
  if (showReportForm) {
    return (
      <div className="space-y-6">

        <IncidentReportForm onBack={() => setShowReportForm(false)} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Recent Incident Card */}
      <Card className='w-full max-w-md hover:shadow-lg transition-shadow duration-200'>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Recent Incident
            </CardTitle>
            <Badge variant="destructive" className="text-xs">
              High Priority
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="flex-1 space-y-1">
              <h3 className="font-semibold text-sm">Phishing Attack Detected</h3>
              <p className="text-xs text-muted-foreground">Suspicious email campaign targeting employees</p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-3 w-3" />
                  John Doe
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  2 hours ago
                </span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button variant="outline" className="w-full">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
        </CardFooter>
      </Card>

      {/* Report New Incident Card */}
      <Card className='w-full max-w-md hover:shadow-lg transition-all duration-200'>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-green-500" />
            Report New Incident
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center py-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-full w-fit mx-auto mb-4">
              <AlertTriangle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-sm text-muted-foreground">
              Found a security incident? Report it immediately to our security team.
            </p>
          </div>
        </CardContent>
        <CardFooter className="pt-0">
          <Button 
            className='w-full'
            onClick={() => setShowReportForm(true)}
          >
            Report an Incident
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

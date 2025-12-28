import { Component, OnInit, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { StatisticsService } from '../../services2/statisticsService/statistics.service';
import { Loader } from '../../core/loader/loader';

Chart.register(...registerables);

/**
 * Dashboard Home Component
 * Displays platform statistics with charts
 */
@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [CommonModule, FormsModule, Loader],
  templateUrl: './dashboard-home.html',
  styleUrls: ['./dashboard-home.scss']
})
export class DashboardHome implements OnInit, AfterViewInit {
  statistics: any = null;
  chartData: any = null;
  loading = true;
  error = '';
  viewReady = false;
  
  // Date range selection
  selectedRange: string = '6months';
  customStartDate: string = '';
  customEndDate: string = '';

  private charts: { [key: string]: Chart } = {};

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit() {
    this.loadStatistics();
    this.loadChartData();
  }

  ngAfterViewInit() {
    // Mark view as ready
    this.viewReady = true;
    // Try to initialize charts if data is already loaded
    if (this.chartData) {
      setTimeout(() => this.initializeCharts(), 100);
    }
  }

  /**
   * Load platform statistics from backend
   */
  loadStatistics() {
    this.loading = true;
    this.error = '';

    this.statisticsService.getPlatformStatistics().subscribe({
      next: (data: any) => {
        this.statistics = data;
        this.loading = false;
        
        // Initialize charts when both statistics and chart data are ready
        if (this.chartData && this.viewReady) {
          setTimeout(() => this.initializeCharts(), 300);
        }
      },
      error: (error: any) => {
        console.error('Error loading statistics:', error);
        this.error = 'Failed to load statistics';
        this.loading = false;
      }
    });
  }

  /**
   * Handle range selection change
   */
  onRangeChange() {
    console.log('📅 Range changed to:', this.selectedRange);
    if (this.selectedRange !== 'custom') {
      this.loadChartData();
    }
  }

  /**
   * Handle custom date change
   */
  onCustomDateChange() {
    console.log('📅 Custom dates changed:', this.customStartDate, 'to', this.customEndDate);
    if (this.customStartDate && this.customEndDate) {
      this.loadChartData();
    }
  }

  /**
   * Load chart data from backend
   */
  loadChartData() {
    const params: any = { range: this.selectedRange };
    
    if (this.selectedRange === 'custom' && this.customStartDate && this.customEndDate) {
      params.startDate = this.customStartDate;
      params.endDate = this.customEndDate;
    }

    this.statisticsService.getChartData(params).subscribe({
      next: (data: any) => {
        console.log('📊 Chart data received:', data);
        this.chartData = data;
        
        // Show info if using sample data
        if (data.isSampleData) {
          console.info('📊 Using sample data for charts (no real data in database yet)');
        } else {
          console.info('✅ Using real data from database!');
        }
        
        // Initialize charts when both statistics and chart data are ready
        if (this.statistics && this.viewReady && !this.loading) {
          setTimeout(() => this.initializeCharts(), 300);
        }
      },
      error: (error: any) => {
        console.error('❌ Error loading chart data:', error);
        console.error('Make sure you are logged in and backend server is running on port 3000');
      }
    });
  }

  /**
   * Initialize all charts
   */
  private initializeCharts() {
    if (!this.chartData) {
      console.warn('⚠️ No chart data available');
      return;
    }

    console.log('🎨 Initializing charts with data:', this.chartData);
    console.log('📊 Selected Range:', this.selectedRange);
    
    // Destroy all existing charts before creating new ones
    this.destroyAllCharts();
    
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      this.createUserGrowthChart();
      this.createJobsChart();
      this.createRevenueChart();
    }, 100);
  }

  /**
   * Destroy all charts
   */
  private destroyAllCharts() {
    Object.keys(this.charts).forEach(key => {
      if (this.charts[key]) {
        this.charts[key].destroy();
        delete this.charts[key];
      }
    });
  }

  /**
   * Create user growth chart
   */
  private createUserGrowthChart() {
    const canvas = document.getElementById('userGrowthChart') as HTMLCanvasElement;
    if (!canvas) {
      console.error('❌ Canvas element #userGrowthChart not found');
      return;
    }
    if (!this.chartData?.userGrowth) {
      console.error('❌ User growth data not available');
      return;
    }

    console.log('✅ Creating User Growth chart with data:', this.chartData.userGrowth);

    // Destroy existing chart if any
    if (this.charts['userGrowth']) {
      this.charts['userGrowth'].destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'line',
      data: {
        labels: this.chartData.userGrowth.labels,
        datasets: [{
          label: 'Users',
          data: this.chartData.userGrowth.data,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'User Growth'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.charts['userGrowth'] = new Chart(ctx, config);
  }

  /**
   * Create jobs chart
   */
  private createJobsChart() {
    const canvas = document.getElementById('jobsChart') as HTMLCanvasElement;
    if (!canvas || !this.chartData?.jobsStatus) return;

    if (this.charts['jobs']) {
      this.charts['jobs'].destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'doughnut',
      data: {
        labels: this.chartData.jobsStatus.labels,
        datasets: [{
          data: this.chartData.jobsStatus.data,
          backgroundColor: [
            'rgb(255, 99, 132)',   // Open - Pink/Red
            'rgb(54, 162, 235)',   // In Progress - Blue
            'rgb(75, 192, 192)',   // Completed - Teal/Green
            'rgb(255, 159, 64)'    // Cancelled - Orange
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          },
          title: {
            display: true,
            text: 'Jobs Status'
          }
        }
      }
    };

    this.charts['jobs'] = new Chart(ctx, config);
  }

  /**
   * Create revenue chart
   */
  private createRevenueChart() {
    const canvas = document.getElementById('revenueChart') as HTMLCanvasElement;
    if (!canvas || !this.chartData?.revenueGrowth) return;

    if (this.charts['revenue']) {
      this.charts['revenue'].destroy();
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const config: ChartConfiguration = {
      type: 'bar',
      data: {
        labels: this.chartData.revenueGrowth.labels,
        datasets: [{
          label: 'Revenue ($)',
          data: this.chartData.revenueGrowth.data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgb(54, 162, 235)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Revenue Growth'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };

    this.charts['revenue'] = new Chart(ctx, config);
  }

  /**
   * Clean up charts on component destroy
   */
  ngOnDestroy() {
    Object.values(this.charts).forEach(chart => chart.destroy());
  }
}

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Search, ArrowUpDown, ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";

interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

// Mock data as fallback
const MOCK_USERS: User[] = [
  {
    id: 1,
    email: "george.bluth@reqres.in",
    first_name: "George",
    last_name: "Bluth",
    avatar: "https://reqres.in/img/faces/1-image.jpg"
  },
  {
    id: 2,
    email: "janet.weaver@reqres.in",
    first_name: "Janet",
    last_name: "Weaver",
    avatar: "https://reqres.in/img/faces/2-image.jpg"
  },
  {
    id: 3,
    email: "emma.wong@reqres.in",
    first_name: "Emma",
    last_name: "Wong",
    avatar: "https://reqres.in/img/faces/3-image.jpg"
  },
  {
    id: 4,
    email: "eve.holt@reqres.in",
    first_name: "Eve",
    last_name: "Holt",
    avatar: "https://reqres.in/img/faces/4-image.jpg"
  },
  {
    id: 5,
    email: "charles.morris@reqres.in",
    first_name: "Charles",
    last_name: "Morris",
    avatar: "https://reqres.in/img/faces/5-image.jpg"
  },
  {
    id: 6,
    email: "tracey.ramos@reqres.in",
    first_name: "Tracey",
    last_name: "Ramos",
    avatar: "https://reqres.in/img/faces/6-image.jpg"
  }
];

const Index = () => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [displayUsers, setDisplayUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingFallback, setUsingFallback] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortField, setSortField] = useState<keyof User>("first_name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const [domainFilter, setDomainFilter] = useState("all");
  const [letterFilter, setLetterFilter] = useState("all");

  // Fetch users when page changes
  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setUsingFallback(false);
      
      try {
        const url = `https://reqres.in/api/users?page=${currentPage}`;
        console.log("Fetching:", url);
        
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        
        console.log("Response status:", response.status);
        
        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }
        
        const json = await response.json();
        console.log("Response data:", json);
        
        if (json.error) {
          throw new Error(json.error);
        }
        
        if (json.data && Array.isArray(json.data) && json.data.length > 0) {
          console.log("✅ API Success! Users loaded:", json.data.length);
          setAllUsers(json.data);
          setTotalPages(json.total_pages || 2);
        } else {
          throw new Error("No data in response");
        }
      } catch (error) {
        console.error("❌ API Error:", error);
        console.log("Using fallback data for page", currentPage);
        
        // Use mock data
        setUsingFallback(true);
        const startIdx = (currentPage - 1) * 6;
        const pageData = MOCK_USERS.slice(startIdx, startIdx + 6);
        setAllUsers(pageData.length > 0 ? pageData : MOCK_USERS);
        setTotalPages(2);
      }
      
      setLoading(false);
    };

    loadUsers();
  }, [currentPage]);

  // Filter and sort whenever dependencies change
  useEffect(() => {
    console.log("Filtering users, total:", allUsers.length);
    
    let filtered = [...allUsers];

    // Search
    if (searchTerm.trim()) {
      filtered = filtered.filter((user) => {
        const search = searchTerm.toLowerCase();
        return (
          user.first_name.toLowerCase().includes(search) ||
          user.last_name.toLowerCase().includes(search) ||
          user.email.toLowerCase().includes(search)
        );
      });
    }

    // Domain filter
    if (domainFilter !== "all") {
      filtered = filtered.filter((user) => 
        user.email.endsWith(`@${domainFilter}`)
      );
    }

    // Letter filter
    if (letterFilter !== "all") {
      filtered = filtered.filter((user) =>
        user.first_name.charAt(0).toUpperCase() === letterFilter
      );
    }

    // Sort
    filtered.sort((a, b) => {
      const aVal = String(a[sortField]).toLowerCase();
      const bVal = String(b[sortField]).toLowerCase();
      
      if (sortOrder === "asc") {
        return aVal < bVal ? -1 : aVal > bVal ? 1 : 0;
      }
      return bVal < aVal ? -1 : bVal > aVal ? 1 : 0;
    });

    console.log("Filtered to:", filtered.length);
    setDisplayUsers(filtered);
  }, [allUsers, searchTerm, sortField, sortOrder, domainFilter, letterFilter]);

  const toggleSort = (field: keyof User) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  const domains = Array.from(
    new Set(allUsers.map((u) => u.email.split("@")[1]))
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3">
            User Directory
          </h1>
          <p className="text-muted-foreground text-lg">
            Search, filter, and explore user profiles
          </p>
        </div>

        {/* Fallback Warning */}
        {usingFallback && (
          <Card className="mb-6 p-4 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
            <div className="flex items-center gap-2 text-amber-800 dark:text-amber-200">
              <AlertCircle className="h-5 w-5" />
              <p className="text-sm">
                API temporarily unavailable. Displaying sample data.
              </p>
            </div>
          </Card>
        )}

        {/* Filters */}
        <Card className="mb-6 p-6 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Domains" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                {domains.map((d) => (
                  <SelectItem key={d} value={d}>@{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={letterFilter} onValueChange={setLetterFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Letters" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Letters</SelectItem>
                {Array.from("ABCDEFGHIJKLMNOPQRSTUVWXYZ").map((letter) => (
                  <SelectItem key={letter} value={letter}>{letter}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <div className="flex items-center justify-center text-sm font-medium px-3 py-2 bg-secondary/50 rounded-md">
              {displayUsers.length} user{displayUsers.length !== 1 ? "s" : ""}
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden shadow-xl">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : displayUsers.length === 0 ? (
            <div className="py-24 text-center text-muted-foreground">
              <p className="text-xl mb-2">No users found</p>
              <p className="text-sm">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-secondary/80 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort("first_name")}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-primary"
                        >
                          First Name
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort("last_name")}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-primary"
                        >
                          Last Name
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left">
                        <button
                          onClick={() => toggleSort("email")}
                          className="flex items-center gap-2 text-sm font-semibold hover:text-primary"
                        >
                          Email
                          <ArrowUpDown className="h-4 w-4" />
                        </button>
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        Avatar
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {displayUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-secondary/40">
                        <td className="px-6 py-4 text-sm font-medium">
                          {user.first_name}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {user.last_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">
                          {user.email}
                        </td>
                        <td className="px-6 py-4">
                          <img
                            src={user.avatar}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="h-10 w-10 rounded-full ring-2 ring-primary/20"
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden divide-y">
                {displayUsers.map((user) => (
                  <div key={user.id} className="p-4 hover:bg-secondary/40">
                    <div className="flex items-center gap-4">
                      <img
                        src={user.avatar}
                        alt={`${user.first_name} ${user.last_name}`}
                        className="h-12 w-12 rounded-full"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {user.first_name} {user.last_name}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-6 py-4 border-t bg-secondary/30">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Previous
                </Button>
                <span className="text-sm font-medium">
                  Page {currentPage} of {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Index;
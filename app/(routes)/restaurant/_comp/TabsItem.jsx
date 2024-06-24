import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from "./MenuSection"
import ReviewSection from "./ReviewSection"


const TabsItem = ({restroInfo}) => {
  return (
        <Tabs defaultValue="category" className="w-full mt-10">
            <TabsList>
                <TabsTrigger value="category">Category</TabsTrigger>
                <TabsTrigger value="about">About</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>
            <TabsContent value="category">
              <MenuSection restroInfo={restroInfo}/>
            </TabsContent>
            <TabsContent value="about">Change your password here.</TabsContent>
            <TabsContent value="reviews"><ReviewSection restroInfo={restroInfo}/></TabsContent>
        </Tabs>

  )
}

export default TabsItem
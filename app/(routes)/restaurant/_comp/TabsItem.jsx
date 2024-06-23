import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import MenuSection from "./MenuSection"


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
            <TabsContent value="reviews">Change your reviews here.</TabsContent>
        </Tabs>

  )
}

export default TabsItem
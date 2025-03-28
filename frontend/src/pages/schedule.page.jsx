import MainBodyContainer from "../components/main-body-container.component";
import { Table } from "flowbite-react";
import green from "../assets/green.svg";
import orange from "../assets/orange.svg";
import red from "../assets/red.svg";

const SchedulePage = () => {
  return (
    <MainBodyContainer title="Schedule">
      {/* Intro Text */}
      <p className="mb-4 text-base text-gray-700">
        View your choir presentation schedule here. It updates automatically with the latest changes.
      </p>

      {/* Responsive Table Container */}
      <div className="w-full overflow-x-auto">
        <Table hoverable className="min-w-[600px]">
          {/* Table Header */}
          <Table.Head>
            <Table.HeadCell className="font-semibold text-gray-700">
              Day
            </Table.HeadCell>
            <Table.HeadCell className="font-semibold text-gray-700">
              Date
            </Table.HeadCell>
            <Table.HeadCell className="font-semibold text-gray-700">
              Time
            </Table.HeadCell>
            <Table.HeadCell className="font-semibold text-gray-700">
              Church
            </Table.HeadCell>
            <Table.HeadCell className="font-semibold text-gray-700">
              Status
            </Table.HeadCell>
          </Table.Head>

          {/* Table Body */}
          <Table.Body className="divide-y">
            {/* Row 1 */}
            <Table.Row className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                16
              </Table.Cell>
              <Table.Cell>Aug, Friday</Table.Cell>
              <Table.Cell>8 - 10am</Table.Cell>
              <Table.Cell>Hiwot Berhan Church</Table.Cell>
              <Table.Cell>
                {/* Empty Status */}
              </Table.Cell>
            </Table.Row>

            {/* Row 2 */}
            <Table.Row className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                17
              </Table.Cell>
              <Table.Cell>Aug, Friday</Table.Cell>
              <Table.Cell>8 - 10am</Table.Cell>
              <Table.Cell>Hiwot Berhan Church</Table.Cell>
              <Table.Cell>
                {/* Empty Status */}
              </Table.Cell>
            </Table.Row>

            {/* Row 3: Recently Added */}
            <Table.Row className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                18
              </Table.Cell>
              <Table.Cell>Aug, Friday</Table.Cell>
              <Table.Cell>8 - 10am</Table.Cell>
              <Table.Cell>Hiwot Berhan Church</Table.Cell>
              <Table.Cell>
                <span className="flex items-center gap-1 text-green-500">
                  <img src={green} alt="green icon" className="w-4 h-4" />
                  Recently Added
                </span>
              </Table.Cell>
            </Table.Row>

            {/* Row 4: Recently Changed */}
            <Table.Row className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                17
              </Table.Cell>
              <Table.Cell>Aug, Friday</Table.Cell>
              <Table.Cell>8 - 10am</Table.Cell>
              <Table.Cell>Hiwot Berhan Church</Table.Cell>
              <Table.Cell>
                <span className="flex items-center gap-1 text-orange-400">
                  <img src={orange} alt="orange icon" className="w-4 h-4" />
                  Recently Changed
                </span>
              </Table.Cell>
            </Table.Row>

            {/* Row 5: Cancelled */}
            <Table.Row className="bg-white">
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900">
                17
              </Table.Cell>
              <Table.Cell>Aug, Friday</Table.Cell>
              <Table.Cell>8 - 10am</Table.Cell>
              <Table.Cell>Hiwot Berhan Church</Table.Cell>
              <Table.Cell>
                <span className="flex items-center gap-1 text-red-500">
                  <img src={red} alt="red icon" className="w-4 h-4" />
                  Cancelled
                </span>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </MainBodyContainer>
  );
};

export default SchedulePage;
